import NextLink from "next/link";

//* interfaces *//
import { INote } from "../../interfaces/INote";

interface Props {
  note: INote;
}

export const NotePreview: React.FC<Props> = ({ note }) => {
  return (
    <article className="group w-full border-b border-t border-orange/60 transition-all duration-300 hover:bg-backgroundHover">
      <NextLink
        href={`/notes/${note.id}`}
        passHref
        className="flex w-full flex-col gap-4 p-4"
      >
        <div className="flex items-center justify-between overflow-hidden">
          <h2 className="w-[70%] overflow-hidden text-ellipsis whitespace-nowrap text-lg font-bold text-white">
            {note.title}
          </h2>
          <time className="font-light text-orange">
            {new Date(note.date).toLocaleDateString(undefined, {
              day: "numeric",
              month: "short",
              year: "2-digit",
            })}
          </time>
        </div>
        <div
          className="note max-h-24 overflow-hidden rounded-[10px]"
          dangerouslySetInnerHTML={{
            __html: note.body,
          }}
        />
      </NextLink>
    </article>
  );
};
