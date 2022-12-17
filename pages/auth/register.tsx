import { useContext } from "react";
import { NextPage } from "next";
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

const RegisterPage: NextPage = () => {
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
              {...register("displayName")}
              error={!!errors.displayName}
              fullWidth
              helperText={errors.displayName?.message}
              label="Nombre completo"
              placeholder="Nombre completo"
              type="text"
            />
            <TextField
              {...register("email")}
              error={!!errors.email}
              fullWidth
              helperText={errors.email?.message}
              label="Email"
              placeholder="email@test.com"
              type="text"
            />
            <TextField
              {...register("password")}
              error={!!errors.password}
              fullWidth
              helperText={errors.password?.message}
              label="Password"
              placeholder="********"
              type="password"
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
