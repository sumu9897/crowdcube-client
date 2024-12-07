import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Banner = () => {
  return (
    <Swiper
      autoHeight={true}
      spaceBetween={20}
      navigation={true}
      pagination={{ clickable: true }}
      modules={[Navigation, Pagination]}
      className="mySwiper"
    >
      {/* Slide 1 */}
      <SwiperSlide>
        <div
          className="text-white text-center py-20 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://i.ibb.co/K5WFSD7/donation-concept-preparing-used-old-clothes.jpg')`,
          }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            "Warm Hearts, Warm Winters"
          </h2>
          <p className="mb-6">
            Together, we bring warmth to vulnerable communities this winter.
          </p>
          <button className="mt-6 px-6 py-2 bg-primary rounded text-white hover:bg-primary-dark">
            Donate Now
          </button>
        </div>
      </SwiperSlide>

      {/* Slide 2 */}
      <SwiperSlide>
        <div
          className="text-white text-center py-20 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://i.ibb.co/slider-image.jpg')`,
          }}
        >
          <h2>Support Running Campaigns</h2>
          <p>Join hands to contribute and make a difference.</p>
        </div>
      </SwiperSlide>

      {/* Slide 3 */}
      <SwiperSlide>
        <div
          className="text-white text-center py-20 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://i.ibb.co/help-contribution.jpg')`,
          }}
        >
          <h2>Real-Time Updates</h2>
          <p>See exactly how your contributions change lives.</p>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default Banner;
