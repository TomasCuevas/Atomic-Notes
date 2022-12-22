import { useContext } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import esLocale from "dayjs/locale/es";

dayjs.locale(esLocale);

//* components *//
import { FullLoader, NewNoteBottom } from "../components/ui";
import { Carousel } from "../components/note";

//* layout *//
import { MainLayout } from "../layout";

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
        <section className="flex w-full max-w-[1010px] p-4">
          <time className="ml-auto font-bold uppercase text-white">
            {dayjs(new Date()).format("DD MMMM YYYY")}
          </time>
        </section>
        <section className="w-full max-w-[1010px] p-4">
          <h2 className="my-2 text-lg text-orange">Notas recientes</h2>
          <Carousel />
        </section>
        <section className="w-full max-w-[1010px] p-4">
          <NewNoteBottom />
        </section>
      </MainLayout>
    );
  }

  return <FullLoader />;
};

export default MainPage;
