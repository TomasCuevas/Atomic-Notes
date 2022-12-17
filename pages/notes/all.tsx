import { useContext } from "react";
import { useRouter } from "next/router";

//* components *//
import { FullLoader } from "../../components/ui";
import { Note } from "../../components/note";

//* layout *//
import { MainLayout } from "../../layout";

//* context *//
import { AuthContext, NotesContext } from "../../context";

const NotesPage = () => {
  const { authState } = useContext(AuthContext);
  const { notes } = useContext(NotesContext);

  const router = useRouter();

  if (authState === "not-authenticated") router.replace("/auth/login");
  if (authState === "authenticated") {
    return (
      <MainLayout
        title="Todas las notas | Atomic Notes"
        description="Pagina para visualizar todas las paginas del usuario"
      >
        <section>
          {notes.map((note) => (
            <Note key={note.id} note={note} />
          ))}
        </section>
      </MainLayout>
    );
  }

  return <FullLoader />;
};

export default NotesPage;
