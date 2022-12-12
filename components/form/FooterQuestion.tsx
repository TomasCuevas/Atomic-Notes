import NextLink from "next/link";

interface Props {
  question: string;
  linkPlaceholder: string;
  link: string;
}

export const FooterQuestion: React.FC<Props> = ({
  question,
  linkPlaceholder,
  link,
}) => {
  return (
    <p className="rounded-md bg-black p-2 text-center text-white">
      ¿{question}?{" "}
      <NextLink href={link} className="font-bold text-orange">
        {linkPlaceholder}
      </NextLink>
    </p>
  );
};
