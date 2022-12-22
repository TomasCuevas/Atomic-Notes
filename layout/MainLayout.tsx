import { useContext } from "react";
import Head from "next/head";

//* components *//
import { Header } from "../components/header";

//* context *//
import { UIContext } from "../context";
import { DesktopSidebar, MobileSidebar } from "../components/sidebar";

//* interface *//
interface Props {
  children: React.ReactNode;
  description: string;
  title: string;
}

export const MainLayout: React.FC<Props> = ({
  children,
  description,
  title,
}) => {
  const { isSidebarOpen } = useContext(UIContext);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      {isSidebarOpen ? <MobileSidebar /> : null}
      <Header />
      <div className="bg-black">
        <DesktopSidebar />
        <main className="flex min-h-[calc(100vh_-_56px)] flex-col items-center bg-black md:min-h-[calc(100vh_-_70px)] lg:left-[275px] lg:top-[70px] lg:ml-[275px]">
          {children}
        </main>
      </div>
    </>
  );
};
