interface Props {
  images: string[];
}

export const ImageGallery: React.FC<Props> = ({ images }) => {
  return (
    <section className="w-full rounded-bl-lg border-b border-l border-white  px-2 py-4">
      <h3 className="mb-4 text-sm font-bold text-orange">Imagenes</h3>
      <article className="flex flex-wrap items-center gap-4">
        {images.map((image) => (
          <div key={image} className="w-32">
            <img src={image} alt="nota imagen" />
          </div>
        ))}
      </article>
    </section>
  );
};
