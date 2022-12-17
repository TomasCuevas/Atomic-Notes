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
  uid: string
): Promise<INote | false> => {
  try {
    const newNote: INote = {
      title: "",
      body: "",
      date: new Date().getTime(),
      imageUrls: [],
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
  uid: string,
  noteId: string
): Promise<INote | false> => {
  try {
    const noteRef = doc(FirebaseDB, `${uid}/allnotes/notes/${noteId}`);
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
  uid: string,
  note: INote
): Promise<boolean> => {
  try {
    const noteRef = doc(FirebaseDB, `${uid}/allnotes/notes/${note.id}`);
    await updateDoc(noteRef, { ...note });

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

//* upload note image *//
export const uploadNoteImageService = async (
  files: FileList
): Promise<string[] | false> => {
  try {
    const fileUploadPromises = [];
    for (const file of files) {
      fileUploadPromises.push(uploadImageService(file));
    }

    const imagesUrl = await Promise.all(fileUploadPromises);
    const urls = imagesUrl.filter((url) => typeof url === "string") as string[];

    return urls;
  } catch (error) {
    console.log(error);
    return false;
  }
};

//* upload image *//
export const uploadImageService = async (
  file: File
): Promise<String | false> => {
  if (!file) return false;

  const cloudUrl = "https://api.cloudinary.com/v1_1/dn3kl3egc/upload";
  const formData = new FormData();
  formData.append("upload_preset", "atomic-notes");
  formData.append("file", file);

  try {
    const response = await fetch(cloudUrl, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) return false;

    const cloudResponse = await response.json();
    return (cloudResponse as { secure_url: string }).secure_url;
  } catch (error) {
    console.log(error);
    return false;
  }
};

//* delete note *//
export const deleteNoteService = async (
  uid: string,
  noteId: string
): Promise<boolean> => {
  try {
    const docRef = doc(FirebaseDB, `${uid}/allnotes/notes/${noteId}`);
    await deleteDoc(docRef);

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
