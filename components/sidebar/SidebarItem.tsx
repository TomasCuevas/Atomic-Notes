import { useContext } from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";

//* icons *//
import { IconType } from "react-icons";

//* context *//
import { UIContext } from "../../context";

//* interface *//
interface Props {
  href: string;
  icon: IconType;
  iconFill: IconType;
  path: string;
  text: string;
}

export const SidebarItem: React.FC<Props> = ({
  icon: Icon,
  iconFill: IconFill,
  href,
  text,
  path,
}) => {
  const { toggleSidebar } = useContext(UIContext);
  const router = useRouter();

  return (
    <li
      onClick={toggleSidebar}
      className={
        router.pathname === path
          ? "group cursor-pointer rounded-full bg-orange "
          : "group cursor-pointer rounded-full transition-all duration-300 hover:bg-orange"
      }
    >
      <NextLink
        href={href}
        className="flex h-full w-full items-center gap-4 px-4 py-2"
      >
        <div
          className={
            router.pathname === path
              ? "flex items-center justify-center rounded-full bg-white p-2"
              : "flex items-center justify-center rounded-full bg-orange p-2 group-hover:bg-white"
          }
        >
          {router.pathname === path ? (
            <IconFill className="h-4 w-4 text-orange" />
          ) : (
            <Icon className="h-4 w-4 text-white group-hover:text-orange" />
          )}
        </div>
        <span
          className={
            router.pathname === path
              ? "text-base font-medium text-white"
              : "text-base font-medium text-white group-hover:text-white"
          }
        >
          {text}
        </span>
      </NextLink>
    </li>
  );
};
