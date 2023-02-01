import { IconType } from "react-icons";

interface Props {
  className?: string;
  isDisabled?: boolean;
  label: string;
  type: "button" | "submit" | "reset";
  onClick?: any;
  icon: IconType;
}

export const FormButtonProvider: React.FC<Props> = ({
  className,
  isDisabled = false,
  label,
  onClick,
  type = "button",
  icon: Icon,
}) => {
  return (
    <button
      onClick={() => {
        onClick ? onClick() : null;
      }}
      type={type}
      disabled={isDisabled}
      className={
        className
          ? className
          : "flex h-[50px] cursor-pointer items-center justify-center gap-3 rounded-md  bg-orange text-xl font-semibold  text-black outline-none transition-all duration-300 hover:bg-orange/50"
      }
    >
      <Icon className="text-white" />
      {label}
    </button>
  );
};
