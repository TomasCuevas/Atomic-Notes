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
import { AuthContext, UIContext } from "../../context";

export const MobileSidebar = () => {
  const { user, startLogout } = useContext(AuthContext);
  const { toggleSidebar } = useContext(UIContext);

  const router = useRouter();

  return (
    <aside
      onClick={toggleSidebar}
      className="fixed top-0 left-0 z-50 min-h-screen w-screen bg-white/20 backdrop-blur-md lg:hidden"
    >
      <div
        onClick={(event) => {
          event.stopPropagation();
        }}
        className="h-screen w-3/4 max-w-[400px]  bg-black"
      >
        <section className="flex h-40 flex-col justify-end bg-[url('/assets/sidebar.svg')] bg-cover bg-no-repeat p-4 sm:h-48">
          <img
            src={user?.photoURL}
            alt={`${user?.displayName} picture`}
            className="h-16 w-16 rounded-full sm:h-20 sm:w-20"
          />
          <h2 className="mt-2 text-white sm:text-xl">{user?.displayName}</h2>
          <h3 className="text-sm text-gray-200 sm:text-base">{user?.email}</h3>
        </section>
        <section className="h-[calc(100vh_-_160px)] py-4 px-2 sm:h-[calc(100vh_-_192px)]">
          <ul className="flex h-full flex-col">
            <li
              onClick={() => {
                router.push("/");
                toggleSidebar();
              }}
              className="group flex cursor-pointer items-center gap-4 rounded-full px-4 py-2 transition-all duration-300 hover:bg-orange"
            >
              <div className="flex items-center justify-center rounded-full bg-orange p-3 group-hover:bg-white">
                {router.pathname === "/" ? (
                  <BsHouseDoorFill className="h-5 w-5 text-white group-hover:text-orange" />
                ) : (
                  <BsHouseDoor className="h-5 w-5 text-white group-hover:text-orange" />
                )}
              </div>
              <span className="text-lg font-medium text-white ">Inicio</span>
            </li>
            <li
              onClick={() => {
                router.push("/notes/new");
                toggleSidebar();
              }}
              className="group flex cursor-pointer items-center gap-4 rounded-full px-4 py-2 transition-all duration-300 hover:bg-orange"
            >
              <div className="flex items-center justify-center rounded-full bg-orange p-3 group-hover:bg-white">
                {router.pathname === "/notes/new" ? (
                  <BsBookmarkPlusFill className="h-5 w-5 text-white group-hover:text-orange" />
                ) : (
                  <BsBookmarkPlus className="h-5 w-5 text-white group-hover:text-orange" />
                )}
              </div>
              <span className="text-lg font-medium text-white ">
                Nueva Nota
              </span>
            </li>
            <li
              onClick={() => {
                router.push("/notes/all");
                toggleSidebar();
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
              <span className="text-lg font-medium text-white ">Notas</span>
            </li>
            <li
              onClick={() => {
                toggleSidebar();
                startLogout();
              }}
              className="group mt-auto flex cursor-pointer items-center gap-4 rounded-full px-4 py-2 transition-all duration-300 hover:bg-white"
            >
              <div className="flex items-center justify-center rounded-full bg-white p-3 group-hover:bg-orange">
                <MdLogout className="h-5 w-5 text-orange group-hover:text-white" />
              </div>
              <span className="text-lg font-medium text-white group-hover:text-orange ">
                Cerrar sesion
              </span>
            </li>
          </ul>
        </section>
      </div>
    </aside>
  );
};
