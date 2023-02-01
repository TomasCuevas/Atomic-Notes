import { useContext } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";

//* components *//
import { FullLoader, NewNoteButton } from "../components/ui";
import { Carousel } from "../components/note";

//* layout *//
import { MainLayout } from "../components/layout";

//* context *//
import { AuthContext } from "../context";

const MainPage: NextPage = () => {
  const { authState } = useContext(AuthContext);
  const router = useRouter();

  if (authState === "not-authenticated") router.replace("/auth/login");
  if (authState === "authenticated") {
    return (
      <MainLayout
        title="Inicio | Atomic Notes"
        description="Pagina de inicio de Atomic Notes"
      >
        <section className="flex w-full max-w-[1275px] p-4">
          <time className="ml-auto font-bold uppercase text-orange">
            {new Date().toLocaleDateString(undefined, {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </time>
        </section>
        <section className="w-full max-w-[1275px] p-4">
          <Carousel />
        </section>
        <section className="w-full max-w-[1275px] p-4">
          <NewNoteButton />
        </section>
      </MainLayout>
    );
  }

  return <FullLoader />;
};

export default MainPage;
