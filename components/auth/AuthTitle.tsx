interface Props {
  topic: string;
}

export const AuthTitle: React.FC<Props> = ({ topic }) => {
  return (
    <h1 className="text-center text-4xl font-bold text-orange md:text-5xl">
      {topic} <br />{" "}
      <span className="text-5xl text-black md:text-6xl">Atomic Notes</span>
    </h1>
  );
};
