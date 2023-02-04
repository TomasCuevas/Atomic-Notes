import { createContext, Dispatch, SetStateAction, useState } from "react";

//* CONTEXT *//
//* CONTEXT *//
interface UIContextProps {
  isSidebarOpen: boolean;
  listNoteSidebar: boolean;
  toggleListNoteSidebar(): void;
  toggleSidebar(): void;
}

export const UIContext = createContext({} as UIContextProps);

//* PROVIDER *//
//* PROVIDER *//
interface UIProviderProps {
  children: React.ReactNode;
}

export const UIProvider: React.FC<UIProviderProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [listNoteSidebar, setListNoteSidebar] = useState<boolean>(true);

  //! toggle sidebar
  const toggleSidebar = () => {
    if (isSidebarOpen) {
      document.body.classList.remove("body__fix");
    } else {
      document.body.classList.add("body__fix");
    }

    setIsSidebarOpen((prev) => !prev);
  };

  //! toggle list note sidebar
  const toggleListNoteSidebar = () => setListNoteSidebar((prev) => !prev);

  return (
    <UIContext.Provider
      value={{
        // getters
        isSidebarOpen,
        listNoteSidebar,

        // methods
        toggleListNoteSidebar,
        toggleSidebar,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
