import { useRouter } from "next/router";

//* interfaces *//
import { INote } from "../../interfaces/INote";

interface Props {
  note: INote;
}

export const NoteCarousel: React.FC<Props> = ({ note }) => {
  const router = useRouter();

  return (
    <article
      onClick={() => router.push(`/notes/${note.id}`)}
      className="group mb-10 ml-auto mr-auto flex h-[400px] w-full cursor-pointer flex-col rounded-t-lg bg-backgroundContrast p-4 shadow-backgroundContrastHover drop-shadow-lg transition-all duration-300 hover:shadow-xl hover:drop-shadow-2xl lg:h-[420px]"
    >
      <h3 className="mb-2 text-xl font-bold text-white">{note.title}</h3>
      <div
        className="note overflow-hidden"
        dangerouslySetInnerHTML={{
          __html: note.body,
        }}
      />
      <time className="mt-auto ml-auto pt-2 text-orange">
        {new Date(note.date).toLocaleDateString(undefined, {
          day: "numeric",
          month: "short",
        })}
      </time>
    </article>
  );
};
