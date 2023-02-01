import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

//* services *//
import {
  createNewNoteService,
  deleteNoteService,
  getAllNotesService,
  getNoteService,
  updateNoteService,
} from "../services";

//* context *//
import { AuthContext } from "./AuthContext";

//* interfaces *//
import { INote } from "../interfaces/INote";

//* CONTEXT *//
//* CONTEXT *//
interface NotesContextProps {
  note: INote | undefined;
  notes: INote[];
  startClearNote(): void;
  startCreatingNote(title: string, body: string): Promise<string | false>;
  startDeleteNote(noteId: string): Promise<boolean>;
  startLoadingNotes(): void;
  startSetNote(noteId: string): void;
  startUpdateNote(note: INote): Promise<boolean>;
}

export const NotesContext = createContext({} as NotesContextProps);

//* PROVIDER *//
//* PROVIDER *//
interface NotesProviderProps {
  children: React.ReactNode;
}

export const NotesProvider: React.FC<NotesProviderProps> = ({ children }) => {
  const { authState, user } = useContext(AuthContext);

  const [note, setNote] = useState<INote>();
  const [notes, setNotes] = useState<INote[]>([]);

  const router = useRouter();

  useEffect(() => {
    if (authState === "authenticated") {
      startLoadingNotes();
    }
  }, [authState]);

  //* load notes
  const startLoadingNotes = async () => {
    const allNotes = await getAllNotesService(user!.uid);
    if (allNotes) setNotes(allNotes);
  };

  //* create note
  const startCreatingNote = async (
    title: string,
    body: string
  ): Promise<string | false> => {
    const id = await createNewNoteService(user!.uid, title, body);

    if (id) {
      return id;
    } else {
      return false;
    }
  };

  //* set note
  const startSetNote = async (noteId: string) => {
    const note = await getNoteService(user!.uid, noteId);
    if (note) {
      setNote(note);
    } else {
      router.replace("/notes/all");
    }
  };

  //* clear note
  const startClearNote = () => setNote(undefined);

  //* update note
  const startUpdateNote = async (note: INote): Promise<boolean> => {
    const wasUpdated = await updateNoteService(user!.uid, note);

    if (wasUpdated) {
      startLoadingNotes();
      startSetNote(note.id!);

      return true;
    } else {
      return false;
    }
  };

  //* delete note
  const startDeleteNote = async (noteId: string) => {
    return await deleteNoteService(user!.uid, noteId);
  };

  return (
    <NotesContext.Provider
      value={{
        // getters
        note,
        notes,

        // methods
        startClearNote,
        startCreatingNote,
        startDeleteNote,
        startLoadingNotes,
        startSetNote,
        startUpdateNote,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};
