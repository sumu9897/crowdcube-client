import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Lottie from "lottie-react";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { Fade } from "react-awesome-reveal";
import { Tooltip } from "react-tooltip";

import animationData from "../assets/animations/animation.json";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import HowItWorks from "../components/HowItWorks";
import Testimonials from "../components/Testimonials";
import SuccessStories from "../components/SuccessStories";

const Home = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const navigate = useNavigate();

  // Fetch active campaigns from the backend
  useEffect(() => {
    fetch("http://localhost:3530/campaign")
      .then((res) => res.json())
      .then((data) => {
        const activeCampaigns = data.filter(
          (campaign) => new Date(campaign.deadline) > new Date()
        );
        setCampaigns(activeCampaigns.slice(0, 6));
      })
      .catch((error) => console.error("Error fetching campaigns:", error));
  }, []);

  // Toggle between dark and light themes
  const toggleTheme = () => setIsDarkTheme(!isDarkTheme);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className={isDarkTheme ? "dark bg-gray-900 text-white" : "bg-white"}>
      {/* Dark/Light Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 p-2 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition"
      >
        {isDarkTheme ? <MdLightMode size={24} /> : <MdDarkMode size={24} />}
      </button>

      {/* Banner/Slider Section */}
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
            <button
              className="mt-6 px-6 py-2 bg-primary rounded text-white hover:bg-primary-dark"
            >
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

      {/* Active Campaigns Section */}
      <section className="mb-12 px-6">
        <h2 className="text-3xl font-bold text-center mb-8">Running Campaigns</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((campaign) => (
            <Fade key={campaign._id}>
              <div className="rounded-lg overflow-hidden shadow-lg bg-gray-100">
                <img
                  src={campaign.image}
                  alt={campaign.title}
                  className="h-48 w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-xl mt-2">{campaign.title}</h3>
                  <p className="text-gray-600 mt-2">
                    {campaign.description.slice(0, 100)}...
                  </p>

                  <button
                    data-tip="View more campaign details"
                    onClick={() => navigate(`/campaign/${campaign._id}`)}
                    className="mt-4 px-4 py-2 bg-yellow-400 text-gray-900 rounded hover:bg-yellow-500 transition"
                  >
                    See More
                  </button>

                  {/* Tooltip */}
                  <Tooltip />
                </div>
              </div>
            </Fade>
          ))}
        </div>
      </section>
      <HowItWorks/>
      <Testimonials/>
      <SuccessStories/>

    </div>
  );
};

export default Home;
