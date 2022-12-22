import { useContext } from "react";
import { useRouter } from "next/router";

//* icons *//
import {
  BsBookmarkPlus,
  BsBookmarkPlusFill,
  BsBookmarks,
  BsBookmarksFill,
  BsHouseDoor,
  BsHouseDoorFill,
} from "react-icons/bs";
import { MdLogout } from "react-icons/md";

//* icons *//
import { AuthContext } from "../../context";

export const DesktopSidebar = () => {
  const { user, startLogout } = useContext(AuthContext);

  const router = useRouter();

  return (
    <aside className="min-h-calc(100vh_-_70px) top-[70px] left-0 z-50 hidden w-[275px] border-r border-orange/60 bg-black lg:fixed lg:block">
      <section className="flex h-40 flex-col justify-end bg-[url('/assets/sidebar.svg')] bg-cover bg-no-repeat p-4 sm:h-48">
        <img
          src={user?.photoURL}
          alt={`${user?.displayName} picture`}
          className="h-16 w-16 rounded-full sm:h-20 sm:w-20"
        />
        <h2 className="mt-2 text-white sm:text-xl">{user?.displayName}</h2>
        <h3 className="text-sm text-gray-100 sm:text-base">{user?.email}</h3>
      </section>
      <section className="h-[calc(100vh_-_262px)] py-4 px-1">
        <ul className="flex h-full flex-col">
          <li
            onClick={() => router.push("/")}
            className="group flex cursor-pointer items-center gap-4 rounded-full px-4 py-2 transition-all duration-300 hover:bg-orange"
          >
            <div className="flex items-center justify-center rounded-full bg-orange p-3 group-hover:bg-white">
              {router.pathname === "/" ? (
                <BsHouseDoorFill className="h-5 w-5 text-white group-hover:text-orange" />
              ) : (
                <BsHouseDoor className="h-5 w-5 text-white group-hover:text-orange" />
              )}
            </div>
            <span className="text-lg font-medium text-white">Inicio</span>
          </li>
          <li
            onClick={() => router.push("/notes/new")}
            className="group flex cursor-pointer items-center gap-4 rounded-full px-4 py-2 transition-all duration-300 hover:bg-orange"
          >
            <div className="flex items-center justify-center rounded-full bg-orange p-3 group-hover:bg-white">
              {router.pathname === "/notes/new" ? (
                <BsBookmarkPlusFill className="h-5 w-5 text-white group-hover:text-orange" />
              ) : (
                <BsBookmarkPlus className="h-5 w-5 text-white group-hover:text-orange" />
              )}
            </div>
            <span className="text-lg font-medium text-white">Nueva Nota</span>
          </li>
          <li
            onClick={() => {
              router.push("/notes/all");
            }}
            className="group flex cursor-pointer items-center gap-4 rounded-full px-4 py-2 transition-all duration-300 hover:bg-orange"
          >
            <div className="flex items-center justify-center rounded-full bg-orange p-3 group-hover:bg-white">
              {router.pathname === "/notes/all" ? (
                <BsBookmarksFill className="h-5 w-5 text-white group-hover:text-orange" />
              ) : (
                <BsBookmarks className="h-5 w-5 text-white group-hover:text-orange" />
              )}
            </div>
            <span className="text-lg font-medium text-white">Notas</span>
          </li>
          <li
            onClick={() => {
              startLogout();
            }}
            className="group mt-auto flex cursor-pointer items-center gap-4 rounded-full px-4 py-2 transition-all duration-300 hover:bg-white"
          >
            <div className="flex items-center justify-center rounded-full bg-white p-3 group-hover:bg-orange">
              <MdLogout className="h-5 w-5 text-orange group-hover:text-white" />
            </div>
            <span className="text-lg font-medium text-white group-hover:text-orange">
              Cerrar sesion
            </span>
          </li>
        </ul>
      </section>
    </aside>
  );
};
