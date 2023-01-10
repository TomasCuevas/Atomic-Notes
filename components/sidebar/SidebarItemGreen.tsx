import { useRouter } from "next/router";
import { IconType } from "react-icons";

//* interface *//
interface Props {
  whenClick(): void;
  icon: IconType;
  text: string;
}

export const SidebarItemGreen: React.FC<Props> = ({
  icon: Icon,
  text,
  whenClick,
}) => {
  const router = useRouter();

  return (
    <li
      onClick={whenClick}
      className="group flex cursor-pointer items-center gap-4 rounded-full bg-[#00a82d] px-4 py-2 transition-all duration-300 hover:bg-[#008f26]"
    >
      <div className="flex items-center justify-center rounded-full bg-white p-2">
        <Icon className="h-4 w-4 text-[#00a82d] group-hover:text-[#008f26]" />
      </div>
      <span className="text-base font-medium text-white">{text}</span>
    </li>
  );
};
