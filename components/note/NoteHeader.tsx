import { useContext } from "react";

//* icons *//
import { MdCheck, MdMoreHoriz } from "react-icons/md";
import { IoContract, IoExpand } from "react-icons/io5";

//* context *//
import { NotesContext, UIContext } from "../../context";

export const NoteHeader = () => {
  const { listNoteSidebar, toggleListNoteSidebar } = useContext(UIContext);
  const { note, isEditing, setIsSaving } = useContext(NotesContext);

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
      <div className="sticky top-0 z-50 flex flex-col rounded-[26px] bg-white px-4 py-2">
        <div className="flex w-full">
          <div className="group flex items-center justify-center rounded-full bg-white hover:bg-background  ">
            <button
              onClick={toggleListNoteSidebar}
              className="h-full w-full p-1 px-2"
            >
              {listNoteSidebar ? (
                <IoContract className="text-xl text-background duration-300 group-hover:text-white" />
              ) : (
                <IoExpand className="text-xl text-background duration-300 group-hover:text-white" />
              )}
            </button>
          </div>
          {isEditing ? (
            <div className="group ml-2 flex items-center justify-center rounded-full bg-white p-1 duration-300 hover:bg-greenLight">
              <button
                onClick={() => {
                  setIsSaving(true);
                }}
                className="h-full w-full"
              >
                <MdCheck className="text-2xl text-greenLight duration-300 group-hover:text-white" />
              </button>
            </div>
          ) : null}
          <div className="group ml-auto flex items-center justify-center rounded-full bg-white p-1 duration-300 hover:bg-background">
            <button className="h-full w-full">
              <MdMoreHoriz className="text-2xl text-background duration-300 group-hover:text-white" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
