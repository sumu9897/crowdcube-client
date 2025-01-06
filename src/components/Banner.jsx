import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const Banner = () => {
  return (
    <div className=" my-4">
      <Swiper
        autoHeight={true}
        spaceBetween={20}
        navigation={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        modules={[Navigation, Pagination, Autoplay]}
        className="mySwiper"
      >
        


        {/* Slide 3 */}
        <SwiperSlide>
          <div
            className="text-white text-center py-20 md:py-40 bg-cover bg-center flex flex-col justify-center items-center"
            style={{
              backgroundImage: `url('https://i.ibb.co.com/sggf3JW/Real-Time-Impact-Updates.png')`,
            }}
          >
            <h2 className="text-3xl md:text-5xl text-black font-bold mb-6 drop-shadow-md">
              Real-Time Impact Updates
            </h2>
            <p className="text-lg md:text-xl text-black mb-8 max-w-2xl drop-shadow-md">
              See exactly how your contributions are changing lives. Stay
              informed with real-time updates.
            </p>
            <button className="mt-6 px-8 py-3 bg-primary rounded-lg text-white font-semibold hover:bg-secondary transition-all duration-300">
              Learn More
            </button>
          </div>
        </SwiperSlide>

        {/* Slide 4 */}
        <SwiperSlide>
          <div
            className="text-white text-center py-20 md:py-40 bg-cover bg-center flex flex-col justify-center items-center"
            style={{
              backgroundImage: `url('https://i.ibb.co.com/LnF4Gcq/Volunteer-With-Us.jpg')`,
            }}
          >
            <h2 className="text-3xl md:text-5xl text-black font-bold mb-6 drop-shadow-md">
              Volunteer With Us
            </h2>
            <p className="text-lg md:text-xl text-black mb-8 max-w-2xl drop-shadow-md">
              Be a part of our mission to make the world a better place. Sign up
              to volunteer and create a lasting impact.
            </p>
            <button className="mt-6 px-8 py-3 bg-primary rounded-lg text-white font-semibold hover:bg-secondary transition-all duration-300">
              Join as a Volunteer
            </button>
          </div>
        </SwiperSlide>

        {/* Slide 5 */}
        <SwiperSlide>
          <div
            className="text-white text-center py-20 md:py-40 bg-cover bg-center flex flex-col justify-center items-center"
            style={{
              backgroundImage: `url('https://i.ibb.co.com/R2ysdjG/Start-Your-Fundraiser.jpg')`,
            }}
          >
            <h2 className="text-3xl md:text-5xl text-black font-bold mb-6 drop-shadow-md">
              Start Your Fundraiser
            </h2>
            <p className="text-lg md:text-xl text-black mb-8 max-w-2xl drop-shadow-md">
              Have a cause you're passionate about? Launch your fundraiser and
              bring your community together.
            </p>
            <button className="mt-6 px-8 py-3 bg-primary rounded-lg text-white font-semibold hover:bg-secondary transition-all duration-300">
              Start Now
            </button>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
