import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Fade } from "react-awesome-reveal";
import Lottie from "lottie-react";
import { MdDarkMode, MdLightMode } from "react-icons/md"; // Import icons
import animationData from "../assets/animations/animation.json";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Home = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const navigate = useNavigate();

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
      {/* Dark/Light Mode Toggle */}
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
        <SwiperSlide>
          <div
            className="text-white text-center py-20 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://i.ibb.co/K5WFSD7/donation-concept-preparing-used-old-clothes-from-wardrobe-rack-into-donate-box-34048-1450.jpg')`,
            }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Warm Hearts, Warm Winters
            </h2>
            <p className="text-lg md:text-xl mb-6">
              Winter can be a harsh season for those without the proper
              clothing. Together, we can help provide warmth and comfort to
              vulnerable communities.
            </p>
            <button className="mt-6 px-6 py-2 bg-primary rounded text-white text-lg hover:bg-primary-dark">
              Donate Now
            </button>
          </div>
        </SwiperSlide>
        {/* Add more slides as needed */}
      </Swiper>

      {/* Running Campaigns Section */}
      <section className="mb-12 px-6">
        <h2 className="text-3xl font-bold text-center mb-8">Running Campaigns</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((campaign) => (
            <Fade key={campaign._id}>
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <img
                  src={campaign.image}
                  alt={campaign.title}
                  className="h-48 w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold">{campaign.title}</h3>
                  <p className="text-gray-600 mt-2">
                    {campaign.description.slice(0, 100)}...
                  </p>
                  <button
                    onClick={() => navigate(`/campaign/${campaign._id}`)}
                    className="mt-4 px-4 py-2 bg-yellow-400 text-gray-900 rounded hover:bg-yellow-500 transition"
                  >
                    See More
                  </button>
                </div>
              </div>
            </Fade>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gray-100 py-12 px-6 mb-12">
        <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-4">
            <Lottie animationData={animationData} className="h-40 w-40 mx-auto" />
            <h3 className="text-xl font-bold">Step 1</h3>
            <p className="text-gray-600">Choose a campaign to support.</p>
          </div>
          <div className="p-4">
            <img src="/images/step2.png" alt="Step 2" className="mx-auto mb-4" />
            <h3 className="text-xl font-bold">Step 2</h3>
            <p className="text-gray-600">Make your contribution.</p>
          </div>
          <div className="p-4">
            <img src="/images/step3.png" alt="Step 3" className="mx-auto mb-4" />
            <h3 className="text-xl font-bold">Step 3</h3>
            <p className="text-gray-600">See your impact in real time.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
