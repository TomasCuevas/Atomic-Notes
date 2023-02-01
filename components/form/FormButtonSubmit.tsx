interface Props {
  label: string;
  disabled?: boolean;
}

export const FormButtonSubmit: React.FC<Props> = ({
  label,
  disabled = false,
}) => {
  return (
    <button
      disabled={disabled}
      type="submit"
      className="w-full cursor-pointer rounded-[10px]  border border-background bg-background py-2 text-lg  font-semibold text-white outline-none duration-300 hover:bg-white hover:text-background disabled:cursor-not-allowed disabled:border-background/20 disabled:bg-background/20 disabled:text-white"
    >
      {label}
    </button>
  );
};
