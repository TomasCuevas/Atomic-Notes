import { FormEvent, useContext } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Head from "next/head";

//* react quill *//
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

//* components *//
import { FullLoader } from "../../components/ui";
import { FormButtonSubmit, FormInputPrimary } from "../../components/form";

//* layout *//
import { MainLayout } from "../../components/layout";

//* hooks *//
import { useNote } from "../../hooks";

//* context *//
import { AuthContext, NotesContext } from "../../context";

const NewNotePage: NextPage = () => {
  const { authState } = useContext(AuthContext);
  const { startCreatingNote } = useContext(NotesContext);
  const router = useRouter();

  const {
    body,
    title,
    errorMessage,
    isDisabled,
    setBody,
    onChangeTitle,
    onSetErrorMessage,
    setIsDisabled,
  } = useNote();

  //! create note
  const onCreateNewNote = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsDisabled(true);

    const noteId = await startCreatingNote(title, body);

    if (noteId) {
      router.replace(`/notes/${noteId}`);
    } else {
      onSetErrorMessage("Ocurrio un error al crear la nota. Intente de nuevo");
      setIsDisabled(false);
    }
  };

  if (authState === "not-authenticated") router.replace("/auth/login");
  if (authState === "authenticated") {
    return (
      <MainLayout
        title="Nueva nota | Atomic Notes"
        description="Crear nueva nota en Atomic Notes"
      >
        <section className="mx-4 flex h-full w-full justify-center">
          <form
            onSubmit={onCreateNewNote}
            className="mx-auto mt-10 flex h-full w-full max-w-[1200px] flex-col gap-4 rounded-[26px] bg-white p-4"
          >
            <FormInputPrimary
              inputChange={onChangeTitle}
              inputName="title"
              inputValue={title}
              label="Titulo"
              max={100}
            />
            <div>
              <ReactQuill value={body} onChange={setBody} />
            </div>
            <div className="sm:ml-auto sm:w-[200px]">
              <FormButtonSubmit label="Crear" disabled={isDisabled} />
            </div>
          </form>
          {errorMessage ? (
            <div className="mt-5 flex w-full items-center justify-center rounded-[26px] bg-[url('/assets/errorBackground.svg')] bg-cover bg-no-repeat px-5 py-3 2xl:max-w-[1200px]">
              <p className="break-words font-bold text-white">{errorMessage}</p>
            </div>
          ) : null}
        </section>
      </MainLayout>
    );
  }

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
