import { ChangeEvent, useContext, useEffect, useRef } from "react";
import { NextPage, GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import es from "yup-es";
import { yupResolver } from "@hookform/resolvers/yup";
import dayjs from "dayjs";
import esLocale from "dayjs/locale/es";
import Swal from "sweetalert2";

Yup.setLocale(es);
dayjs.locale(esLocale);

//* material ui *//
import { TextField } from "@mui/material";

//* icons *//
import { BsImage, BsTrash, BsSave } from "react-icons/bs";

//* components *//
import { FullLoader } from "../../components/ui";
import { ImageGallery } from "../../components/note";

//* layout *//
import { MainLayout } from "../../layout";

//* service *//
import {
  deleteNoteService,
  getNoteService,
  updateNoteService,
  uploadNoteImageService,
} from "../../services";

//* context *//
import { AuthContext, NotesContext } from "../../context";

//* form schema *//
const schema = Yup.object().shape({
  title: Yup.string().min(0).max(50).label("El titulo"),
  body: Yup.string().min(0).max(2_000).label("La nota"),
});

//* interface *//
import { INote } from "../../interfaces/INote";

interface Props {
  id: string;
}

const NotePage: NextPage<Props> = ({ id }) => {
  const { authState, user } = useContext(AuthContext);
  const { startLoadingNotes } = useContext(NotesContext);
  const router = useRouter();

  const fileInputRef = useRef(null);

  const {
    formState: { errors },
    getValues,
    handleSubmit,
    register,
    setValue,
    watch,
  } = useForm<INote>({
    resolver: yupResolver(schema),
  });

  //* get note *//
  const onLoadNote = async () => {
    const note = await getNoteService(user!.uid, id);
    if (!note) {
      router.replace("/");
    } else {
      setValue("body", note.body);
      setValue("date", note.date);
      setValue("id", note.id);
      setValue("imageUrls", note.imageUrls);
      setValue("title", note.title);
    }
  };

  //* upload images
  const onFileInputChange = async ({
    target,
  }: ChangeEvent<HTMLInputElement>) => {
    if (target.files!.length === 0) return;

    const result = await uploadNoteImageService(target.files!);
    if (!result) {
      Swal.fire(
        "Error al subir las imagenes. Vuelve a intentarlo.",
        undefined,
        "error"
      );
    } else {
      const prevUrls = getValues("imageUrls");
      setValue("imageUrls", [...prevUrls!, ...result]);
      onUpdateNote();
    }
  };

  //* delete note
  const onDeleteNote = async () => {
    Swal.fire({
      title: "¿Quieres borrar la nota?",
      showCancelButton: true,
      confirmButtonColor: "#a00",
      confirmButtonText: "Borrar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const noteId = getValues("id");

        const result = await deleteNoteService(user!.uid, noteId!);
        if (result) {
          Swal.fire("Nota borrada con exito.", "", "success");
          startLoadingNotes();
          router.replace("/notes/all");
        } else {
          Swal.fire("Error al borrar la nota.", "", "error");
        }
      }
    });
  };

  //* update note
  const onUpdateNote = async () => {
    const note: INote = {
      body: getValues("body"),
      date: new Date().getTime(),
      id: getValues("id"),
      imageUrls: getValues("imageUrls"),
      title: getValues("title"),
    };

    setValue("date", note.date);

    const status = await updateNoteService(user!.uid, note);
    if (status) {
      startLoadingNotes();
      Swal.fire("Nota actualizada con exito.", undefined, "success");
    } else {
      Swal.fire("Error al actualizar la nota.", undefined, "error");
    }
  };

  useEffect(() => {
    if (authState === "authenticated") {
      onLoadNote();
    }
  }, [authState]);

  if (authState === "not-authenticated") router.replace("/auth/login");
  if (authState === "authenticated" && watch("id")) {
    return (
      <MainLayout
        title="Nota | Atomic Notes"
        description={`Pagina de nota ${getValues("id")}`}
      >
        <div className="flex flex-col gap-4 p-4">
          <section className="rounded-bl-lg border-b border-l border-white px-2 py-1">
            <p className="text-end font-bold text-white">
              {dayjs(watch("date")).format("D MMM YYYY - hh:mm A")}
            </p>
          </section>
          <section className="rounded-bl-lg border-b border-l border-white  px-2 py-4">
            <form className="flex w-full flex-col gap-5">
              <TextField
                error={!!errors.title}
                helperText={errors.title?.message}
                {...register("title")}
                type="text"
                className="w-full"
                InputProps={{
                  style: { color: "#fff", backgroundColor: "#fff2" },
                }}
                InputLabelProps={{
                  style: { color: "#fff" },
                }}
              />
              <TextField
                {...register("body")}
                error={!!errors.body}
                helperText={errors.body?.message}
                type="text"
                className="w-full"
                multiline
                minRows={12}
                InputProps={{
                  style: { color: "#fff", backgroundColor: "#fff2" },
                }}
                InputLabelProps={{
                  style: { color: "#fff" },
                }}
              />
            </form>
          </section>

          {watch("imageUrls")!.length > 0 ? (
            <ImageGallery images={watch("imageUrls") || []} />
          ) : null}
        </div>

        <footer className="sticky bottom-0 left-0 mt-auto w-full bg-black/40 px-4 py-4 backdrop-blur-md">
          <div className="flex h-full w-full justify-around gap-4">
            <section className="flex flex-col items-center gap-1">
              <input
                ref={fileInputRef}
                type="file"
                accept=".jpg, .png"
                multiple
                onChange={onFileInputChange}
                className="hidden"
              />
              <BsImage
                onClick={() =>
                  (fileInputRef.current! as { click: any }).click()
                }
                className="text-2xl text-orange"
              />
            </section>
            <section className="flex flex-col items-center gap-1">
              <BsTrash
                onClick={onDeleteNote}
                className="text-2xl text-orange"
              />
            </section>
            <section className="flex flex-col items-center gap-1">
              <BsSave
                onClick={handleSubmit(onUpdateNote)}
                className="text-2xl text-orange"
              />
            </section>
          </div>
        </footer>
      </MainLayout>
    );
  }

  return <FullLoader />;
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };

  return {
    props: {
      id,
    },
  };
};

export default NotePage;
