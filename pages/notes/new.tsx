import { useContext, useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";

//* components *//
import { FullLoader } from "../../components/ui";

//* service *//
import { createNewNoteService } from "../../services";

//* context *//
import { AuthContext } from "../../context";
import Head from "next/head";

const NewNotePage: NextPage = () => {
  const { authState, user } = useContext(AuthContext);
  const router = useRouter();

  //* create note
  const onCreateNewNote = async () => {
    const note = await createNewNoteService(user!.uid);

    if (!note) {
      router.replace("/");
    } else {
      router.push(`/notes/${note.id}`);
    }
  };

  useEffect(() => {
    if (authState === "authenticated") {
      onCreateNewNote();
    }

    if (authState === "not-authenticated") {
      router.replace("/auth/login");
    }
  }, [authState]);

  return (
    <>
      <Head>
        <title>Nueva Nota | Atomic Notes</title>
      </Head>
      <FullLoader />
    </>
  );
};

export default NewNotePage;
