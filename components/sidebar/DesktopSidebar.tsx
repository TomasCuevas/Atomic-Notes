import { useContext } from "react";
import { useRouter } from "next/router";

//* icons *//
import {
  BsBookmarkPlus,
  BsBookmarks,
  BsBookmarksFill,
  BsHouseDoor,
  BsHouseDoorFill,
} from "react-icons/bs";

//* components *//
import {
  SidebarItem,
  SidebarItemGreen,
  SidebarLogout,
  SidebarProfile,
} from "./";

//* context *//
import { AuthContext } from "../../context";

export const DesktopSidebar = () => {
  const { user } = useContext(AuthContext);

  const router = useRouter();

  return (
    <aside className="left-0 z-50 hidden min-h-screen w-[230px] flex-col border-r border-orange/60 bg-black lg:fixed lg:flex">
      <SidebarProfile
        displayName={user!.displayName!}
        email={user!.email}
        photoURL={user!.photoURL!}
      />
      <section className="border-b border-orange/60 py-2 px-1">
        <SidebarItemGreen
          icon={BsBookmarkPlus}
          text="Nueva nota"
          whenClick={() => router.push("/notes/new")}
        />
      </section>
      <section className="flex flex-grow py-4 px-1">
        <ul className="flex flex-grow flex-col gap-1">
          <SidebarItem
            icon={BsHouseDoor}
            iconFill={BsHouseDoorFill}
            path="/"
            text="Inicio"
            whenClick={() => router.push("/")}
          />
          <SidebarItem
            icon={BsBookmarks}
            iconFill={BsBookmarksFill}
            path="/notes/all"
            text="Notas"
            whenClick={() => router.push("/notes/all")}
          />
          <SidebarLogout />
        </ul>
      </section>
    </aside>
  );
};
