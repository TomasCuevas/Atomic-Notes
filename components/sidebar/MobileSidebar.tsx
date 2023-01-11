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

//* components *//
import {
  SidebarItem,
  SidebarItemGreen,
  SidebarLogout,
  SidebarProfile,
} from "./";

//* contexts *//
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
        className="flex h-screen w-3/4  max-w-[230px] flex-col bg-black"
      >
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
          <ul className="flex h-full flex-grow flex-col gap-1">
            <SidebarItem
              icon={BsHouseDoor}
              iconFill={BsHouseDoorFill}
              path="/"
              text="Inicio"
              whenClick={() => {
                router.push("/");
                toggleSidebar();
              }}
            />
            <SidebarItem
              icon={BsBookmarks}
              iconFill={BsBookmarksFill}
              path="/notes/all"
              text="Notas"
              whenClick={() => {
                router.push("/notes/all");
                toggleSidebar();
              }}
            />
            <SidebarLogout />
          </ul>
        </section>
      </div>
    </aside>
  );
};
