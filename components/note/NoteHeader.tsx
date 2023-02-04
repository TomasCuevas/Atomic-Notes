import { useContext } from "react";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

//* icons *//
import { MdCheck, MdDeleteOutline, MdOutlineMode } from "react-icons/md";
import { RiFullscreenFill, RiFullscreenExitFill } from "react-icons/ri";

//* context *//
import { NotesContext, UIContext } from "../../context";

export const NoteHeader = () => {
  const { listNoteSidebar, toggleListNoteSidebar } = useContext(UIContext);
  const { note, notes, isEditing, setIsSaving, setIsEditing, startDeleteNote } =
    useContext(NotesContext);

  const router = useRouter();

  //! delete note
  const onDeleteNote = async () => {
    Swal.fire({
      title: "¿Quieres borrar la nota?",
      showCancelButton: true,
      confirmButtonColor: "#a00",
      confirmButtonText: "Borrar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const noteId = note!.id;

        const result = await startDeleteNote(noteId!);
        if (result) {
          Swal.fire("Nota borrada con exito.", "", "success");
          router.replace(
            `/notes/${notes[0].id === note!.id ? notes[1].id : notes[0].id}`
          );
        } else {
          Swal.fire("Error al borrar la nota.", "", "error");
        }
      }
    });
  };

  return (
    <>
      <div className="flex">
        <div className="ml-auto flex items-center gap-2 rounded-[12px] px-4 font-light text-white duration-300">
          <span>Ultima vez editado</span>
          <time>
            {new Date(note!.date).toLocaleDateString(undefined, {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </time>
        </div>
      </div>
      <div className="flex flex-col rounded-[26px] bg-white px-4 py-2">
        <div className="flex w-full">
          <div className="group hidden items-center justify-center rounded-full bg-white hover:bg-background xl:flex  ">
            <button
              onClick={() => toggleListNoteSidebar()}
              className="h-full w-full p-1 px-2"
            >
              {listNoteSidebar ? (
                <RiFullscreenFill className="text-xl text-background duration-300 group-hover:text-white" />
              ) : (
                <RiFullscreenExitFill className="text-xl text-background duration-300 group-hover:text-white" />
              )}
            </button>
          </div>

          {isEditing ? (
            <div className="group ml-2 flex items-center justify-center rounded-full bg-white p-1 duration-300 hover:bg-greenLight">
              <button
                onClick={() => setIsSaving(true)}
                className="h-full w-full"
              >
                <MdCheck className="text-2xl text-greenLight duration-300 group-hover:text-white" />
              </button>
            </div>
          ) : (
            <div className="group ml-2 flex items-center justify-center rounded-full bg-white p-1 duration-300 hover:bg-yellow">
              <button
                onClick={() => setIsEditing(true)}
                className="h-full w-full"
              >
                <MdOutlineMode className="text-2xl text-yellow duration-300 group-hover:text-white" />
              </button>
            </div>
          )}

          <div className="group relative ml-auto flex items-center justify-center">
            <button
              onClick={onDeleteNote}
              className="h-full w-full rounded-full bg-white p-1 duration-300 group-hover:bg-red-600"
            >
              <MdDeleteOutline className="text-2xl text-red-600 duration-300 hover:text-white group-hover:text-white" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
