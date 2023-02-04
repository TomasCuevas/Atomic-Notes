import { ChangeEvent, useEffect, useState } from "react";

export const useNote = (bodyValue?: string, titleValue?: string) => {
  const [body, setBody] = useState(bodyValue || "");
  const [title, setTitle] = useState(titleValue || "");
  const [errorMessage, setErrorMessage] = useState("");
  const [isDisabled, setIsDisabled] = useState(title.length < 1);

  //! change title
  const onChangeTitle = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setTitle(target.value);
  };

  //! set error
  const onSetErrorMessage = (message: string) => {
    setErrorMessage(message);

    setTimeout(() => {
      setErrorMessage("");
    }, 5000);
  };

  useEffect(() => {
    if (title.length < 1) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [title]);

  return {
    // getters
    body,
    errorMessage,
    isDisabled,
    title,

    // setters
    onSetErrorMessage,
    setBody,
    setIsDisabled,
    onChangeTitle,
  };
};
