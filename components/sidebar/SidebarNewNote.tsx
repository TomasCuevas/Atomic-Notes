import { useContext } from "react";
import NextLink from "next/link";
import { IconType } from "react-icons";

//* context *//
import { UIContext } from "../../context";

//* interface *//
interface Props {
  href: string;
  icon: IconType;
  text: string;
}

export const SidebarNewNote: React.FC<Props> = ({ icon: Icon, text, href }) => {
  const { toggleSidebar } = useContext(UIContext);

  return (
    <li
      onClick={toggleSidebar}
      className="group cursor-pointer rounded-full bg-greenLight transition-all duration-300 hover:bg-green"
    >
      <NextLink
        href={href}
        className="flex h-full w-full items-center gap-4 px-4 py-2"
      >
        <div className="flex items-center justify-center rounded-full bg-white p-2">
          <Icon className="h-4 w-4 text-greenLight group-hover:text-green" />
        </div>
        <span className="text-base font-medium text-white">{text}</span>
      </NextLink>
    </li>
  );
};
