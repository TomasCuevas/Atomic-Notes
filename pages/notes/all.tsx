import { useContext } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";

//* components *//
import { FullLoader } from "../../components/ui";
import { NotePreview } from "../../components/note";

//* layout *//
import { MainLayout } from "../../components/layout";

//* context *//
import { AuthContext, NotesContext } from "../../context";

const NotesPage: NextPage = () => {
  const { authState } = useContext(AuthContext);
  const { notes } = useContext(NotesContext);

  const router = useRouter();

  if (authState === "not-authenticated") router.replace("/auth/login");
  if (authState === "authenticated" && notes) {
    return (
      <MainLayout
        title="Todas las notas | Atomic Notes"
        description="Pagina para visualizar todas las paginas del usuario"
      >
        <section className="flex h-screen flex-col overflow-y-auto">
          {notes.map((note) => (
            <NotePreview key={note.id} note={note} />
          ))}
        </section>
      </MainLayout>
    );
  }

  return <FullLoader />;
};

export default NotesPage;
