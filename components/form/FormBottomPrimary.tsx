interface Props {
  className?: string;
  isDisabled?: boolean;
  label: string;
  type: "button" | "submit" | "reset";
  onClick?: any;
}

export const FormButtonPrimary: React.FC<Props> = ({
  className,
  isDisabled = false,
  label,
  onClick,
  type = "button",
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
          : "h-[50px] cursor-pointer rounded-md border border-black bg-white text-xl font-semibold text-black  outline-none transition-all duration-300 hover:border-orange hover:bg-orange hover:text-white"
      }
    >
      {label}
    </button>
  );
};
