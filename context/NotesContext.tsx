import { createContext, useContext, useEffect, useState } from "react";

//* services *//
import { getAllNotesService } from "../services";

//* context *//
import { AuthContext } from "./AuthContext";

//* interfaces *//
import { INotes } from "../interfaces/INote";

//* CONTEXT *//
//* CONTEXT *//
interface NotesContextProps {
  notes: INotes[];
  startLoadingNotes(): void;
}

export const NotesContext = createContext({} as NotesContextProps);

//* PROVIDER *//
//* PROVIDER *//
interface NotesProviderProps {
  children: React.ReactNode;
}

export const NotesProvider: React.FC<NotesProviderProps> = ({ children }) => {
  const { authState, user } = useContext(AuthContext);
  const [notes, setNotes] = useState<INotes[]>([]);

  useEffect(() => {
    if (authState === "authenticated") {
      startLoadingNotes();
    }
  }, [authState]);

  const startLoadingNotes = async () => {
    const allNotes = await getAllNotesService(user!.uid);
    if (allNotes) setNotes(allNotes);
  };

  return (
    <NotesContext.Provider
      value={{
        // getters
        notes,

        // methods
        startLoadingNotes,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};
