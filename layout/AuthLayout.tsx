import Head from "next/head";

//* interface *//
interface Props {
  children: React.ReactNode;
  description: string;
  title: string;
}

export const AuthLayout: React.FC<Props> = ({
  children,
  description,
  title,
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      <main className="flex min-h-screen items-center justify-center bg-[url('/assets/backgroundMobile.svg')] bg-cover bg-no-repeat p-4 md:bg-[url('/assets/backgroundDesktop.svg')]">
        {children}
      </main>
    </>
  );
};
