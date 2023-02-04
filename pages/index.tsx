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
        <div className="flex w-full flex-col items-center">
          <section className="mx-auto flex w-full max-w-[1275px] p-4">
            <time className="ml-auto font-bold uppercase text-orange">
              {new Date().toLocaleDateString(undefined, {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </time>
          </section>
          <section className="mx-auto w-full max-w-[1275px] p-4">
            <Carousel />
          </section>
          <section className="mx-auto w-full max-w-[1275px] p-4">
            <NewNoteButton />
          </section>
        </div>
      </MainLayout>
    );
  }

  return <FullLoader />;
};

export default MainPage;
