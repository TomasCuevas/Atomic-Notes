import { useContext } from "react";
import NextLink from "next/link";

//* icons *//
import { MdOutlineMenu } from "react-icons/md";

//* context *//
import { UIContext } from "../../context";

export const Header: React.FC = () => {
  const { toggleSidebar } = useContext(UIContext);

  return (
    <header className="sticky top-0 left-0 z-40 flex h-14 items-center  bg-orange p-4 sm:h-16 sm:px-6 lg:hidden">
      <NextLink href="/" className="flex items-center gap-4">
        <img
          src="/icon.svg"
          alt="Atomic Notes icon"
          className="h-10 w-10 md:h-12 md:w-12"
        />
        <h1 className="text-xl font-light text-white md:text-2xl">
          <span className="text-2xl font-bold md:text-3xl">A</span>
          <span className="font-bold">t</span>
          omic
          <span className="text-2xl font-bold md:text-3xl"> N</span>o
          <span className="font-bold">t</span>
          es
        </h1>
      </NextLink>
      <MdOutlineMenu
        onClick={toggleSidebar}
        className="ml-auto text-4xl text-white lg:hidden"
      />
    </header>
  );
};
