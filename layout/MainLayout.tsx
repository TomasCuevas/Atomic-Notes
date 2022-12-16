import { useContext } from "react";
import Head from "next/head";

//* components *//
import { MobileHeader } from "../components/header";

//* context *//
import { UIContext } from "../context";
import { MobileSidebar } from "../components/sidebar";

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
      <MobileHeader />
      <main className="flex min-h-[calc(100vh_-_56px)] flex-col bg-black">
        {children}
      </main>
    </>
  );
};
