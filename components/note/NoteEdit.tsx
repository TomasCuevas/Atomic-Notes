import { useContext, FormEvent } from "react";
import dynamic from "next/dynamic";

//* react quill *//
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

//* components *//
import { FormButtonSubmit, FormInputPrimary } from "../form";
import { FullLoader } from "../ui";

//* hooks *//
import { useNote } from "../../hooks";

//* context *//
import { NotesContext, AuthContext } from "../../context";

//* interfaces *//
import { INote } from "../../interfaces/INote";

interface Props {
  note: INote;
}

export const NoteEdit: React.FC<Props> = ({ note }) => {
  const { authState } = useContext(AuthContext);
  const { startUpdateNote } = useContext(NotesContext);

  const {
    body,
    title,
    errorMessage,
    isDisabled,
    setBody,
    onChangeTitle,
    onSetErrorMessage,
    setIsDisabled,
  } = useNote(note.body, note.title);

  //* update note
  const onUpdateNote = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsDisabled(true);

    const wasUpdated = await startUpdateNote({
      ...note,
      body,
      title,
      date: new Date().getTime(),
    });

    if (wasUpdated) {
      setIsDisabled(false);
    } else {
      onSetErrorMessage(
        "Ocurrio un error al actualizar la nota. Intente de nuevo"
      );
      setIsDisabled(false);
    }
  };

  if (authState === "authenticated") {
    return (
      <>
        <form
          onSubmit={onUpdateNote}
          className="flex max-w-full flex-col rounded-[26px]"
        >
          <div className="flex flex-col gap-4">
            <div>
              <FormInputPrimary
                inputChange={onChangeTitle}
                inputName="title"
                inputValue={title}
                label="Titulo"
                max={100}
              />
            </div>
            <div>
              <ReactQuill value={body} onChange={setBody} />
            </div>
            <div className="sm:ml-auto sm:w-[280px]">
              <FormButtonSubmit label="Guardar" disabled={isDisabled} />
            </div>
          </div>
        </form>
        {errorMessage ? (
          <div className="mt-5 flex w-full items-center justify-center rounded-[26px] bg-[url('/assets/errorBackground.svg')] bg-cover bg-no-repeat px-5 py-3 2xl:max-w-[1200px]">
            <p className="break-words font-bold text-white">{errorMessage}</p>
          </div>
        ) : null}
      </>
    );
  }

  return <FullLoader />;
};
