// HomeSlider.jsx

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./HomeSlider.css"; // CSS file for custom styles

const slides = [
  {
    title: "Save Surplus Food",
    description: "Bridge the gap between waste and need through tech.",
    image:
      "https://i.ibb.co/Qv6kV3xx/gettyimages-1137006822-612x612.jpg",
  },
  {
    title: "Feed the Community",
    description: "Empower charities with accessible food donations.",
    image:
      "https://i.ibb.co/nssy46Ld/Treasure-trove-of-wasted-food-sm2.jpg",
  },
  {
    title: "Tech for Good",
    description: "Reduce food waste using smart logistics.",
    image:
      "https://i.ibb.co/84g1X9WV/stock-photo-expired-organic-bio-waste-mix-vegetables-and-fruits-in-a-huge-container-in-a-rubbish-bin.jpg",
  },
];

const HomeSlider = () => {
  return (
    <div className="slider-wrapper">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
        className="my-swiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="slide"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="overlay ">
                <h2 className="text-4xl text-green-300 font-bold lg:text-8xl lg:font-extrabold">{slide.title}</h2>
                <p className="text-3xl font-bold text-blue-400 ">{slide.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomeSlider;
