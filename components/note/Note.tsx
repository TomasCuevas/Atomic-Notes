import NextLink from "next/link";
import dayjs from "dayjs";
import esLocale from "dayjs/locale/es";

dayjs.locale(esLocale);

//* interface *//
import { INote } from "../../interfaces/INote";

interface Props {
  note: INote;
}

export const Note: React.FC<Props> = ({ note }) => {
  return (
    <article className=" border-b border-t border-white/30">
      <NextLink
        href={`/notes/${note.id}`}
        passHref
        className="flex flex-col gap-4 p-4"
      >
        <div className="flex items-center justify-between overflow-hidden">
          <h2 className="w-[70%] overflow-hidden text-ellipsis whitespace-nowrap text-lg font-light text-white">
            {note.title}
          </h2>
          <time className="text-white/50">
            {dayjs(note.date).format("D MMM. YY")}
          </time>
        </div>
        <div className="max-h-32 overflow-hidden">
          <p className="text-white/50">{note.body}</p>
        </div>
      </NextLink>
    </article>
  );
};
