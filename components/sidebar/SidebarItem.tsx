import { useRouter } from "next/router";
import { IconType } from "react-icons";

//* interface *//
interface Props {
  whenClick(): void;
  icon: IconType;
  iconFill: IconType;
  text: string;
  path: string;
}

export const SidebarItem: React.FC<Props> = ({
  icon: Icon,
  iconFill: IconFill,
  whenClick,
  text,
  path,
}) => {
  const router = useRouter();

  return (
    <li
      onClick={whenClick}
      className={
        router.pathname === path
          ? "group flex cursor-pointer items-center gap-4 rounded-full bg-orange px-4 py-2"
          : "group flex cursor-pointer items-center gap-4 rounded-full px-4 py-2 transition-all duration-300 hover:bg-orange"
      }
    >
      <div
        className={
          router.pathname === path
            ? "flex items-center justify-center rounded-full bg-white p-3"
            : "flex items-center justify-center rounded-full bg-orange p-3 group-hover:bg-white"
        }
      >
        {router.pathname === path ? (
          <IconFill className="h-5 w-5 text-orange" />
        ) : (
          <Icon className="h-5 w-5 text-white group-hover:text-orange" />
        )}
      </div>
      <span className="text-lg font-medium text-white">{text}</span>
    </li>
  );
};
