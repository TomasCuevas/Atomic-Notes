import { useContext } from "react";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import * as Yup from "yup";
import es from "yup-es";
import { yupResolver } from "@hookform/resolvers/yup";

Yup.setLocale(es);

//* components *//
import { FullLoader } from "../../components/ui";
import { FooterQuestion, FormButtonPrimary } from "../../components/form";

//* layout *//
import { AuthLayout } from "../../layout";

//* context *//
import { AuthContext } from "../../context";

//* interfaces *//
import { IRegister } from "../../interfaces/IRegister";

//* form schema *//
const schema = Yup.object().shape({
  displayName: Yup.string().min(2).max(40).required().label("Nombre completo"),
  email: Yup.string().email().required().label("Email"),
  password: Yup.string().min(8).max(32).required().label("Password"),
});

const RegisterPage = () => {
  const { authState, startRegister } = useContext(AuthContext);

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<IRegister>({
    resolver: yupResolver(schema),
  });

  const router = useRouter();

  const onRegister: SubmitHandler<IRegister> = async (formData, event) => {
    event?.preventDefault();

    await startRegister(formData);
  };

  if (authState === "authenticated") router.replace("/");
  if (authState === "not-authenticated") {
    return (
      <AuthLayout
        title="Registro | Atomic Notes"
        description="Pagina para registrarse en Atomic Notes"
      >
        <article className="h-full w-full rounded-lg bg-white/80 px-4 py-12 shadow-md shadow-orange">
          <h1 className="text-center text-4xl font-bold text-orange">
            Registrarse en <br />{" "}
            <span className="text-5xl text-black">Atomic Notes</span>
          </h1>
          <form
            autoComplete="off"
            onSubmit={handleSubmit(onRegister)}
            className="flex flex-col gap-4 rounded-md py-10"
          >
            <TextField
              label="Nombre completo"
              type="text"
              placeholder="Nombre completo"
              fullWidth
              {...register("displayName")}
              error={!!errors.displayName}
              helperText={errors.displayName?.message}
            />
            <TextField
              label="Email"
              type="text"
              placeholder="email@test.com"
              fullWidth
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              label="Password"
              type="password"
              placeholder="********"
              fullWidth
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <FormButtonPrimary label="Registrarse" type="submit" />
          </form>
          <FooterQuestion
            link="/auth/login"
            linkPlaceholder="Inicia sesion"
            question="Ya tienes una cuenta"
          />
        </article>
      </AuthLayout>
    );
  }

  return <FullLoader />;
};

export default RegisterPage;
