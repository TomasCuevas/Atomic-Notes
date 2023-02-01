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
      onClick={(event) => {
        onClick ? onClick(event) : null;
      }}
      type={type}
      disabled={isDisabled}
      className={
        className
          ? className
          : "w-full cursor-pointer rounded-[10px]  border border-background bg-background py-2 text-lg  font-semibold text-white outline-none duration-300 hover:bg-white hover:text-background disabled:cursor-not-allowed disabled:border-background/20 disabled:bg-background/20 disabled:text-white"
      }
    >
      {label}
    </button>
  );
};
