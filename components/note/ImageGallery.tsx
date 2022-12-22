interface Props {
  images: string[];
}

export const ImageGallery: React.FC<Props> = ({ images }) => {
  return (
    <section className="w-full rounded-bl-lg border-b border-l border-orange/60 p-4">
      <h3 className="mb-4 text-sm font-bold text-orange">Imagenes</h3>
      <article className="flex flex-wrap items-center gap-4">
        {images.map((image) => (
          <div
            key={image}
            className="max-w-[150px] sm:max-w-[200px] md:max-w-[230px] lg:max-w-[260px] xl:max-w-[280px]"
          >
            <img src={image} alt="nota imagen" className="cursor-pointer" />
          </div>
        ))}
      </article>
    </section>
  );
};
