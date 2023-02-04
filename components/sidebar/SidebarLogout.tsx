import { useContext } from "react";

//* icons *//
import { MdLogout } from "react-icons/md";

//* context *//
import { AuthContext } from "../../context";

export const SidebarLogout = () => {
  const { startLogout } = useContext(AuthContext);

  return (
    <li
      onClick={() => startLogout()}
      className="group mt-auto flex cursor-pointer items-center gap-4 rounded-full px-4 py-2 transition-all duration-300 hover:bg-white"
    >
      <div className="flex items-center justify-center rounded-full bg-white p-2 group-hover:bg-orange">
        <MdLogout className="h-4 w-4 text-orange group-hover:text-white" />
      </div>
      <span className="text-base font-medium text-white group-hover:text-orange">
        Cerrar sesion
      </span>
    </li>
  );
};
