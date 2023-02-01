import { useContext } from "react";

//* icons *//
import {
  BsBookmarkPlus,
  BsBookmarks,
  BsBookmarksFill,
  BsHouseDoor,
  BsHouseDoorFill,
} from "react-icons/bs";

//* components *//
import { SidebarItem, SidebarNewNote, SidebarLogout, SidebarProfile } from "./";

//* contexts *//
import { AuthContext, UIContext } from "../../context";

export const MobileSidebar = () => {
  const { user } = useContext(AuthContext);
  const { toggleSidebar } = useContext(UIContext);

  return (
    <aside
      onClick={toggleSidebar}
      className="fixed top-0 left-0 z-50 min-h-screen w-screen bg-white/10 backdrop-blur-md lg:hidden"
    >
      <div
        onClick={(event) => {
          event.stopPropagation();
        }}
        className="flex h-screen w-3/4  max-w-[230px] flex-col border-r border-orange/60 bg-background"
      >
        <SidebarProfile
          displayName={user!.displayName!}
          email={user!.email}
          photoURL={user!.photoURL!}
        />
        <section className="border-b border-orange/60 py-2 px-1">
          <ul>
            <SidebarNewNote
              icon={BsBookmarkPlus}
              text="Nueva nota"
              href="/notes/new"
            />
          </ul>
        </section>
        <section className="flex flex-grow py-4 px-1">
          <ul className="flex h-full flex-grow flex-col gap-1">
            <SidebarItem
              icon={BsHouseDoor}
              iconFill={BsHouseDoorFill}
              path="/"
              text="Inicio"
              href="/"
            />
            <SidebarItem
              icon={BsBookmarks}
              iconFill={BsBookmarksFill}
              path="/notes/all"
              text="Notas"
              href="/notes/all"
            />
            <SidebarLogout />
          </ul>
        </section>
      </div>
    </aside>
  );
};
