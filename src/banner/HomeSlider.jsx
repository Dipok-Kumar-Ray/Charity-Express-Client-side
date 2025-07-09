import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const sliderData = [
  {
    id: 1,
    title: "Donate Surplus Food",
    description: "Restaurants can now donate extra meals to local charities in need.",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: 2,
    title: "Support Local Communities",
    description: "Charities pick up fresh surplus food and serve those in need.",
    image: "https://images.unsplash.com/photo-1505576391880-b3f9d713dcf0?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: 3,
    title: "Browse & Become a Charity",
    description: "Users can explore food listings or apply as verified charity.",
    image: "https://images.unsplash.com/photo-1576765607924-094d58b6ab62?auto=format&fit=crop&w=1400&q=80",
  },
];

const HomeSlider = () => {
  return (
    <div className="w-full h-[600px]">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{ delay: 4000 }}
        className="w-full h-full"
      >
        {sliderData.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="w-full h-full bg-cover bg-center relative"
              style={{
                backgroundImage: `url(${slide.image})`,
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-center px-4">
                <h2 className="text-white text-4xl md:text-5xl font-bold mb-4">
                  {slide.title}
                </h2>
                <p className="text-white text-lg md:text-xl max-w-2xl">
                  {slide.description}
                </p>
                <button className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl transition duration-300 shadow-lg">
                  Learn More
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomeSlider;
