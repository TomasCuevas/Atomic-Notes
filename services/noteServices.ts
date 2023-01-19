import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore/lite";

//* firebase config *//
import { FirebaseDB } from "../firebase/config";

//* interface *//
import { INote } from "../interfaces/INote";

//* services *//
//* services *//

//* create new note *//
export const createNewNoteService = async (
  uid: string,
  title: string,
  body: string
): Promise<INote | false> => {
  try {
    const newNote: INote = {
      title,
      body,
      date: new Date().getTime(),
    };

    const newDoc = await addDoc(
      collection(FirebaseDB, `${uid}/allnotes/notes`),
      {
        ...newNote,
      }
    );

    await updateDoc(newDoc, { id: newDoc.id });

    newNote.id = newDoc.id;

    return newNote;
  } catch (error) {
    console.log(error);
    return false;
  }
};

//* get a note *//
export const getNoteService = async (
  userId: string,
  noteId: string
): Promise<INote | false> => {
  try {
    const noteRef = doc(FirebaseDB, `${userId}/allnotes/notes/${noteId}`);
    const note = await getDoc(noteRef);

    const noteReturn = { ...note.data(), id: note.id } as INote;

    return noteReturn;
  } catch (error) {
    console.log(error);
    return false;
  }
};

//* get all notes *//
export const getAllNotesService = async (
  uid: string
): Promise<INote[] | false> => {
  try {
    const collectionRef = collection(FirebaseDB, `${uid}/allnotes/notes`);
    const docs = await getDocs(collectionRef);

    const notes: INote[] = [];

    docs.forEach((doc) => {
      notes.push({ ...(doc.data() as INote) });
    });

    return notes.sort(({ date }, { date: date2 }) => date2 - date);
  } catch (error) {
    console.log(error);
    return false;
  }
};

//* update note *//
export const updateNoteService = async (
  userId: string,
  note: INote
): Promise<boolean> => {
  try {
    const noteRef = doc(FirebaseDB, `${userId}/allnotes/notes/${note.id}`);
    await updateDoc(noteRef, { ...note });

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

//* delete note *//
export const deleteNoteService = async (
  userId: string,
  noteId: string
): Promise<boolean> => {
  try {
    const docRef = doc(FirebaseDB, `${userId}/allnotes/notes/${noteId}`);
    await deleteDoc(docRef);

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
