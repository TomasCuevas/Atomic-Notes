import { useContext, useEffect } from "react";
import { NextPage, GetServerSideProps } from "next";
import { useRouter } from "next/router";

//* components *//
import { FullLoader } from "../../components/ui";
import {
  ListNotesSidebar,
  Note,
  NoteEdit,
  NoteHeader,
} from "../../components/note";

//* layout *//
import { MainLayout } from "../../components/layout";

//* contexts *//
import { AuthContext, NotesContext, UIContext } from "../../context";

//* interface *//
interface Props {
  id: string;
}

const NotePage: NextPage<Props> = ({ id }) => {
  const { authState } = useContext(AuthContext);
  const { listNoteSidebar } = useContext(UIContext);
  const { isEditing, note, notes, setIsEditing, startSetNote } =
    useContext(NotesContext);

  const router = useRouter();

  useEffect(() => {
    if (authState === "authenticated") startSetNote(id);
  }, [authState, id]);

  useEffect(() => {
    setIsEditing(false);
  }, [id]);

  if (authState === "not-authenticated") router.replace("/auth/login");
  if (authState === "authenticated" && note && notes) {
    return (
      <MainLayout
        title="Nota | Atomic Notes"
        description={`Pagina de nota ${note.id}`}
      >
        {listNoteSidebar ? <ListNotesSidebar /> : null}
        <section
          className={` mx-auto flex max-h-[calc(100vh_-_64px)] w-full flex-col gap-4 overflow-y-scroll p-4 sm:px-6 lg:left-[230px] lg:max-h-screen ${
            listNoteSidebar ? "xl:max-w-[calc(100vw_-_590px)]" : "max-w-full"
          }`}
        >
          <NoteHeader />
          <div
            className="rounded-[26px] bg-white p-4"
            onClick={() => setIsEditing(true)}
          >
            {isEditing ? <NoteEdit note={note} /> : <Note note={note} />}
          </div>
        </section>
      </MainLayout>
    );
  }

  return <FullLoader />;
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };

  return {
    props: {
      id,
    },
  };
};

export default NotePage;
