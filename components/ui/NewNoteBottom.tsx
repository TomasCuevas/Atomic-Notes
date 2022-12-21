import { useRouter } from "next/router";

//* icons *//
import { BsBookmarkPlus } from "react-icons/bs";

export const NewNoteBottom = () => {
  const router = useRouter();

  return (
    <button
      type="button"
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange p-4"
      onClick={() => router.push("/notes/new")}
    >
      <BsBookmarkPlus className="text-2xl text-white" />
      <span className="text-lg font-bold text-white">Nueva nota</span>
    </button>
  );
};
