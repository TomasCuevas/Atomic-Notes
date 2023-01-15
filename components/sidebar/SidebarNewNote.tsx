import { IconType } from "react-icons";

//* interface *//
interface Props {
  whenClick(): void;
  icon: IconType;
  text: string;
}

export const SidebarNewNote: React.FC<Props> = ({
  icon: Icon,
  text,
  whenClick,
}) => {

  return (
    <li
      onClick={whenClick}
      className="group flex cursor-pointer items-center gap-4 rounded-full bg-greenLight px-4 py-2 transition-all duration-300 hover:bg-green"
    >
      <div className="flex items-center justify-center rounded-full bg-white p-2">
        <Icon className="h-4 w-4 text-greenLight group-hover:text-green" />
      </div>
      <span className="text-base font-medium text-white">{text}</span>
    </li>
  );
};
