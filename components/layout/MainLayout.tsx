import { useContext } from "react";
import Head from "next/head";

//* components *//
import { Header } from "../header";
import { DesktopSidebar, MobileSidebar } from "../sidebar";

//* context *//
import { UIContext } from "../../context";

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
      <main className="flex min-h-[calc(100vh_-_56px)] flex-col items-center bg-background sm:min-h-[calc(100vh_-_64px)] lg:ml-[230px] lg:min-h-screen">
        {children}
      </main>
    </>
  );
};
