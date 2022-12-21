import { useRouter } from "next/router";
import dayjs from "dayjs";
import esLocale from "dayjs/locale/es";

dayjs.locale(esLocale);

//* interface *//
import { INote } from "../../interfaces/INote";

interface Props {
  note: INote;
}

export const NoteCarousel: React.FC<Props> = ({ note }) => {
  const router = useRouter();

  return (
    <article
      onClick={() => router.push(`/notes/${note.id}`)}
      className="mb-10 ml-auto mr-auto flex h-[260px] w-[170px] flex-col rounded-md bg-gray-700 p-4 drop-shadow-xl"
    >
      <h3 className="mb-2 font-medium text-white">{note.title}</h3>
      <p className="max-h-[150px] overflow-hidden text-ellipsis text-gray-400">
        {note.body}
      </p>
      <time className="mt-auto ml-auto text-gray-300">
        {dayjs(note.date).format("D MMM")}
      </time>
    </article>
  );
};
