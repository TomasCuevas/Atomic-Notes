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

export const Carousel = () => {
  const { notes } = useContext(NotesContext);

  return (
    <Swiper
      className="max-w-[362px] xs:max-w-[540px] md:max-w-[735px] lg:max-w-[900px]"
      modules={[Pagination]}
      spaceBetween={10}
      pagination={{ clickable: true }}
      breakpoints={{
        0: {
          spaceBetween: 10,
          slidesPerView: 1,
        },
        363: {
          spaceBetween: 10,
          slidesPerView: 2,
        },
        560: {
          spaceBetween: 10,
          slidesPerView: 3,
        },
        768: {
          spaceBetween: 10,
          slidesPerView: 4,
        },
        1024: {
          spaceBetween: 10,
          slidesPerView: 5,
        },
      }}
    >
      {notes.slice(0, 5).map((note) => (
        <SwiperSlide key={note.id}>
          <NoteCarousel note={note} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
