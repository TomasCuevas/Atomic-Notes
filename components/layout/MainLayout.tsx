import { useContext } from "react";
import Head from "next/head";

//* components *//
import { Header } from "../header";

//* context *//
import { UIContext } from "../../context";
import { DesktopSidebar, MobileSidebar } from "../sidebar";

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
      <DesktopSidebar />
      <Header />
      <main className="flex h-[calc(100vh_-_56px)] flex-col items-center overflow-hidden bg-white sm:h-[calc(100vh_-_64px)] lg:left-[230px] lg:top-[70px] lg:ml-[230px] lg:max-h-screen lg:min-h-screen">
        {children}
      </main>
    </>
  );
};
