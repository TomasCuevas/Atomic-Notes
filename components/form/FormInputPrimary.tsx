import { useState, useEffect } from "react";

//* interface *//
interface Props {
  inputChange: any;
  inputName: string;
  inputValue: string;
  label: string;
  max?: number;
}

export const FormInputPrimary: React.FC<Props> = ({
  inputChange,
  inputName,
  inputValue,
  label,
  max,
}) => {
  const [focus, setFocus] = useState(false);
  const inputFocus = () => setFocus(true);
  const inputBlur = () => {
    if (typeof inputValue === "string" && inputValue.length < 1) {
      setFocus(false);
    }
  };

  useEffect(() => {
    if (typeof inputValue === "string" && inputValue.length > 0) {
      setFocus(true);
    }
  }, [inputValue]);

  return (
    <div className="relative flex h-[50px] items-center rounded-[10px] bg-background px-5">
      <label
        htmlFor={inputName}
        className={
          focus
            ? "absolute top-[5px] text-xs font-light text-orange transition-all duration-300"
            : "absolute font-medium text-orange transition-all duration-300"
        }
      >
        {label}
      </label>
      <input
        maxLength={max}
        onFocus={inputFocus}
        onBlur={inputBlur}
        type="text"
        name={inputName}
        id={inputName}
        value={inputValue}
        onChange={inputChange}
        className="w-full border-none bg-[#0000] pt-[10px] text-lg font-medium text-white outline-none autofill:!bg-[#0000]"
      />
    </div>
  );
};
