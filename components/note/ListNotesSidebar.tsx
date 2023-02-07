import { useContext } from "react";

//* components *//
import { NotePreview } from "./NotePreview";

//* context *//
import { NotesContext } from "../../context";

export const ListNotesSidebar = () => {
  const { notes } = useContext(NotesContext);

  return (
    <section className="hidden max-h-screen w-[350px] border-r border-orange/30 xl:flex xl:flex-col xl:overflow-y-auto">
      {notes.map((note) => (
        <NotePreview key={note.id} note={note} />
      ))}
    </section>
  );
};
