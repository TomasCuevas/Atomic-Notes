import { useRouter } from "next/router";

//* icons *//
import { BsBookmarkPlus } from "react-icons/bs";

export const NewNoteButton = () => {
  const router = useRouter();

  return (
    <button
      type="button"
      className="group flex w-full items-center justify-center gap-2 rounded-xl bg-greenLight p-3 transition-all duration-300 hover:bg-green"
      onClick={() => router.push("/notes/new")}
    >
      <BsBookmarkPlus className="text-2xl text-white" />
      <span className="text-lg font-bold text-white">Nueva nota</span>
    </button>
  );
};
