//* interface *//
interface Props {
  displayName: string;
  email: string;
  photoURL: string;
}

export const SidebarProfile: React.FC<Props> = ({
  displayName,
  email,
  photoURL,
}) => {
  return (
    <section className="flex flex-col justify-end bg-[url('/assets/sidebar.svg')] bg-cover bg-no-repeat p-4">
      <img
        src={photoURL}
        alt={`${displayName} picture`}
        className="h-16 w-16 rounded-full"
        referrerPolicy="no-referrer"
      />
      <h2 className="mt-2 text-white sm:text-xl">{displayName}</h2>
      <h3 className="text-sm text-gray-100">{email}</h3>
    </section>
  );
};
