import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";

// Import Swiper components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


const Home = () => {
  const [campaigns, setCampaigns] = useState([]);
  const navigate = useNavigate();

  // Fetch campaigns from the database
  useEffect(() => {
    fetch("http://localhost:3530/campaign")
      .then((res) => res.json())
      .then((data) => {
        const activeCampaigns = data.filter(
          (campaign) => new Date(campaign.deadline) > new Date()
        );
        setCampaigns(activeCampaigns.slice(0, 6)); // Limit to 6 campaigns
      })
      .catch((error) => console.error("Error fetching campaigns:", error));
  }, []);

  // Slider Settings
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
    <div>
      {/* Banner/Slider Section */}
      <Swiper
            autoHeight={true}
            spaceBetween={20}
            navigation={true}
            pagination={{
                clickable: true,
            }}
            modules={[Navigation, Pagination]}
            className="mySwiper"
            >
            <SwiperSlide>
                <div
                className="text-white text-center py-20 bg-cover bg-center"
                style={{
                    backgroundImage: `url('https://i.ibb.co.com/K5WFSD7/donation-concept-preparing-used-old-clothes-from-wardrobe-rack-into-donate-box-34048-1450.jpg')`,
                }}
                >
                <h2 className="text-3xl md:text-5xl font-bold mb-4">
                    Warm Hearts, Warm Winters
                </h2>
                <p className="text-lg md:text-xl mb-6">
                    Winter can be a harsh season for those without the proper clothing. 
                    Together, we can help provide warmth and comfort to vulnerable communities. 
                </p>
                <button className="mt-6 px-6 py-2 bg-primary rounded text-white text-lg hover:bg-primary-dark">
                    Donate Now
                </button>
                </div>
            </SwiperSlide>

            <SwiperSlide>
                <div
                className="text-white text-center py-20 bg-cover bg-center"
                style={{
                    backgroundImage: `url('https://i.ibb.co.com/2gY9y8k/View-Campaigns.webp')`,
                }}
                >
                <h2 className="text-3xl md:text-5xl font-bold mb-4">
                    Every Donation Counts
                </h2>
                <p className="text-lg md:text-xl mb-6">
                    A single act of kindness can spark hope in someone's life. 
                    Every coat, sweater, or blanket you donate has the power to make winters warmer.
                </p>
                <button className="mt-6 px-6 py-2 bg-primary rounded text-white text-lg hover:bg-primary-dark">
                    View Campaigns
                </button>
                </div>
            </SwiperSlide>

            <SwiperSlide>
                <div
                className="text-black text-center py-20 bg-cover bg-center"
                style={{
                    backgroundImage: `url('https://i.ibb.co.com/5shb8JN/watercolor-human-rights-day-background-23-2150998255.jpg')`,
                }}
                >
                <h2 className="text-3xl md:text-5xl font-bold mb-4">
                    Together, We Create Impact
                </h2>
                <p className="text-lg md:text-xl mb-6">
                    Join hands with us to build a community of compassion. 
                    With your help, we can reach the farthest corners of Bangladesh, bringing relief to those in need.
                </p>
                <button className="mt-6 px-6 py-2 bg-primary rounded text-white text-lg hover:bg-primary-dark">
                    Join as Volunteer
                </button>
                </div>
            </SwiperSlide>

            <SwiperSlide>
                <div
                className=" text-center py-20 bg-cover bg-center"
                style={{
                    backgroundImage: `url('https://i.ibb.co.com/qgCSWJc/learn-more.webp')`,
                }}
                >
                <h2 className="text-3xl text-blue-700 md:text-5xl font-bold mb-4">
                    Make Winter Warmer
                </h2>
                <p className="text-lg md:text-xl text-gray-400 mb-6">
                    Your generosity brings smiles and warmth to countless families. 
                    Together, we can make winters a little easier for those who need it most.
                </p>
                <button className="mt-6 px-6 py-2 bg-primary rounded text-white text-lg hover:bg-primary-dark">
                    Learn More
                </button>
                </div>
            </SwiperSlide>
        </Swiper>

      {/* Running Campaigns Section */}
      <section className="mb-12 px-6">
        <h2 className="text-3xl font-bold text-center mb-8">Running Campaigns</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((campaign) => (
            <div
              key={campaign._id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <img
                src={campaign.image}
                alt={campaign.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold">{campaign.title}</h3>
                <p className="text-gray-600 mt-2">{campaign.description.slice(0, 100)}...</p>
                <button
                  onClick={() => navigate(`/campaign/${campaign._id}`)}
                  className="mt-4 px-4 py-2 bg-yellow-400 text-gray-900 rounded hover:bg-yellow-500 transition"
                >
                  See More
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Extra Section 1: How It Works */}
      <section className="bg-gray-100 py-12 px-6 mb-12">
        <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-4">
            <img src="/images/step1.png" alt="Step 1" className="mx-auto mb-4" />
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

      {/* Extra Section 2: Testimonials */}
      <section className="bg-white py-12 px-6">
        <h2 className="text-3xl font-bold text-center mb-8">What People Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-4 bg-gray-50 rounded shadow-md">
            <p className="text-gray-600">
              "DonationHub has made it so easy to help those in need. Highly
              recommend!"
            </p>
            <h4 className="text-yellow-500 font-bold mt-4">- John Doe</h4>
          </div>
          <div className="p-4 bg-gray-50 rounded shadow-md">
            <p className="text-gray-600">
              "A wonderful platform that truly connects people for a great
              cause."
            </p>
            <h4 className="text-yellow-500 font-bold mt-4">- Jane Smith</h4>
          </div>
          <div className="p-4 bg-gray-50 rounded shadow-md">
            <p className="text-gray-600">
              "I am so happy to have contributed through DonationHub. Very
              reliable!"
            </p>
            <h4 className="text-yellow-500 font-bold mt-4">- Alice Johnson</h4>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
