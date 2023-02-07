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

//* context *//
import { AuthContext, NotesContext } from "../../context";

export const DesktopSidebar = () => {
  const { user } = useContext(AuthContext);
  const { notes } = useContext(NotesContext);

  return (
    <aside className="left-0 z-50 hidden min-h-screen w-[230px] flex-col border-r border-orange/60 bg-background lg:fixed lg:flex">
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
        <ul className="flex flex-grow flex-col gap-1">
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
            path={`${notes[0]?.id ? "/notes/[id]" : "/notes/all"}`}
            text="Notas"
            href={`/notes/${notes[0]?.id ? notes[0].id : "all"}`}
          />
          <SidebarLogout />
        </ul>
      </section>
    </aside>
  );
};
