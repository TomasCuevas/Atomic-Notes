import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
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
  isEditing: boolean;
  isSaving: boolean;
  note: INote | undefined;
  notes: INote[];
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  setIsSaving: Dispatch<SetStateAction<boolean>>;
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
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    if (authState === "authenticated") {
      startLoadingNotes();
    }

    if (authState === "not-authenticated") {
      startClearNote();
      startClearNotes();
    }
  }, [authState]);

  //! load notes
  const startLoadingNotes = async (): Promise<void> => {
    const allNotes = await getAllNotesService(user!.uid);
    if (allNotes) setNotes(allNotes);
  };

  //! clear all notes
  const startClearNotes = () => setNotes([]);

  //! create note
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

  //! set note
  const startSetNote = async (noteId: string): Promise<void> => {
    const note = await getNoteService(user!.uid, noteId);
    if (note) {
      setNote(note);
    } else {
      router.replace("/notes/all");
    }
  };

  //! clear note
  const startClearNote = () => setNote(undefined);

  //! update note
  const startUpdateNote = async (noteToUpdate: INote): Promise<boolean> => {
    if (
      noteToUpdate.body === note!.body &&
      noteToUpdate.title === note!.title
    ) {
      return false;
    }

    const wasUpdated = await updateNoteService(user!.uid, noteToUpdate);

    if (wasUpdated) {
      startLoadingNotes();
      startSetNote(noteToUpdate.id!);

      return true;
    } else {
      return false;
    }
  };

  //! delete note
  const startDeleteNote = async (noteId: string) => {
    return await deleteNoteService(user!.uid, noteId);
  };

  return (
    <NotesContext.Provider
      value={{
        // getters
        isEditing,
        isSaving,
        note,
        notes,

        // methods
        setIsEditing,
        setIsSaving,
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
