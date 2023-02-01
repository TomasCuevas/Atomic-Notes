//* interface *//
interface Props {
  children: React.ReactNode;
}

export const AuthHoc: React.FC<Props> = ({ children }) => {
  return (
    <article className="h-full w-full max-w-[420px] rounded-lg bg-white px-4 py-12 drop-shadow-xl md:py-24 2xl:ml-[40%]">
      {children}
    </article>
  );
};
