import { useContext, useEffect } from "react";
import dynamic from "next/dynamic";

//* react quill *//
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

//* components *//
import { FormInputPrimary } from "../form";
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
  const { startUpdateNote, isSaving, setIsSaving, setIsEditing } =
    useContext(NotesContext);

  const { body, title, setBody, onChangeTitle } = useNote(
    note.body,
    note.title
  );

  //* update note
  const onUpdateNote = async () => {
    await startUpdateNote({
      ...note,
      body,
      title,
      date: new Date().getTime(),
    });

    setIsSaving(false);
    setIsEditing(false);
  };

  useEffect(() => {
    if (isSaving) onUpdateNote();
  }, [isSaving]);

  if (authState === "authenticated") {
    return (
      <>
        <form className="flex max-w-full flex-col rounded-[26px]">
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
          </div>
        </form>
      </>
    );
  }

  return <FullLoader />;
};
