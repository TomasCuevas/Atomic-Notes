import { useRouter } from "next/router";

//* icons *//
import { BsBookmarkPlus } from "react-icons/bs";

export const NewNoteBottom = () => {
  const router = useRouter();

  return (
    <button
      type="button"
      className="group flex w-full items-center justify-center gap-2 rounded-xl bg-orange p-3 transition-all duration-300 hover:bg-white"
      onClick={() => router.push("/notes/new")}
    >
      <BsBookmarkPlus className="text-2xl text-white group-hover:text-orange" />
      <span className="text-lg font-bold text-white group-hover:text-orange">
        Nueva nota
      </span>
    </button>
  );
};
