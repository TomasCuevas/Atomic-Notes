import { useContext } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import * as Yup from "yup";
import es from "yup-es";
import { yupResolver } from "@hookform/resolvers/yup";

Yup.setLocale(es);

//* icons *//
import { BsGoogle } from "react-icons/bs";

//* components *//
import { AuthHoc, AuthTitle } from "../../components/auth";
import { FullLoader } from "../../components/ui";
import {
  FooterQuestion,
  FormButtonProvider,
  FormButtonPrimary,
} from "../../components/form";

//* layout *//
import { AuthLayout } from "../../components/layout";

//* context *//
import { AuthContext } from "../../context";

//* interfaces
import { ILogin } from "../../interfaces/ILogin";

//* form schema *//
const schema = Yup.object().shape({
  email: Yup.string().email().required().label("Email"),
  password: Yup.string().min(8).max(32).required().label("Password"),
});

const LoginPage: NextPage = () => {
  const { authState, startLoginWithEmailPassword, startLoginWithGoogle } =
    useContext(AuthContext);

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<ILogin>({
    resolver: yupResolver(schema),
  });

  const router = useRouter();

  const onLoginWithEmailPassword: SubmitHandler<ILogin> = async (
    formData,
    event
  ) => {
    event?.preventDefault();

    await startLoginWithEmailPassword(formData);
  };

  const onLoginWithGoogle = async () => {
    await startLoginWithGoogle();
  };

  if (authState === "authenticated") router.replace("/");
  if (authState === "not-authenticated") {
    return (
      <AuthLayout
        title="Login | Atomic Notes"
        description="Pagina para registrarse en Atomic Notes"
      >
        <AuthHoc>
          <AuthTitle topic="Ingresa en" />
          <form
            onSubmit={handleSubmit(onLoginWithEmailPassword)}
            className="flex flex-col gap-4 rounded-md py-10"
          >
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
            <FormButtonPrimary label="Ingresar" type="submit" />
            <FormButtonProvider
              label="Ingresar con Google"
              type="button"
              icon={BsGoogle}
              onClick={onLoginWithGoogle}
            />
          </form>
          <FooterQuestion
            link="/auth/register"
            linkPlaceholder="Registrate"
            question="No tienes una cuenta"
          />
        </AuthHoc>
      </AuthLayout>
    );
  }

  return <FullLoader />;
};

export default LoginPage;
