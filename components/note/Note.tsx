//* interfaces *//
import { INote } from "../../interfaces/INote";

interface Props {
  note: INote;
}

export const Note: React.FC<Props> = ({ note }) => {
  return (
    <>
      <div className="mb-5 flex min-h-[50px] items-center overflow-hidden rounded-[10px] bg-background p-4">
        <h2 className="break-words text-xl font-black text-white">
          {note.title}
        </h2>
      </div>
      <div
        id="note"
        className="overflow-hidden rounded-[10px]"
        dangerouslySetInnerHTML={{
          __html: note.body,
        }}
      />
    </>
  );
};
