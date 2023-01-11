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
      <main className="flex min-h-screen flex-col items-center overflow-hidden bg-black px-4 xs:px-8 lg:left-[230px] lg:top-[70px] lg:ml-[230px]">
        {children}
      </main>
    </>
  );
};
