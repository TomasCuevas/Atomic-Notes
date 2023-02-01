import { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";

//* swiper styles *//
import "swiper/css";
import "swiper/css/pagination";

//* components *//
import { NoteCarousel } from ".";

//* context *//
import { NotesContext } from "../../context";

export const Carousel: React.FC = () => {
  const { notes } = useContext(NotesContext);

  if (notes.length > 0) {
    return (
      <section className="w-full max-w-[1275px] p-4">
        <h2 className="my-2 text-lg font-medium text-orange">
          Notas recientes
        </h2>
        <Swiper
          className="max-w-[420px] rounded-lg sm:max-w-[660px] mdx:max-w-[850px] lg:max-w-[770px] xl:max-w-[1018px] 2xl:max-w-[1275px]"
          modules={[Pagination]}
          pagination={{ clickable: true }}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            400: {
              slidesPerView: 2,
            },
            640: {
              slidesPerView: 3,
            },
            900: {
              slidesPerView: 4,
            },
            1024: {
              slidesPerView: 3,
            },
            1280: {
              slidesPerView: 4,
            },
            1516: {
              slidesPerView: 5,
            },
          }}
        >
          {notes.slice(0, 10).map((note) => (
            <SwiperSlide key={note.id}>
              <NoteCarousel note={note} />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    );
  }

  return <></>;
};
