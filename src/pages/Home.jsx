import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";

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
      <section className="mb-12">
        <Slider {...sliderSettings}>
          <div className="h-72 bg-cover bg-center" style={{ backgroundImage: "url('https://i.ibb.co.com/3kmWJHX/DALL-E-2024-12-06-09-01-56-An-inspiring-scene-of-diverse-people-joining-hands-in-a-circle-under-a-dr.webp?fbclid=IwY2xjawG_SdBleHRuA2FlbQIxMAABHY8f7GQWAaHGG96dbj7cUlbLU1CxjAU2bYXq77DUa9EsKRlZyxxPk10l3A_aem_InM1gvoegvmsuNNt9itDEQ')" }}>
            <div className="h-full bg-black bg-opacity-50 flex items-center justify-center text-center text-white">
              <h1 className="text-4xl font-bold">Join Hands to Make a Difference</h1>
            </div>
          </div>
          <div className="h-72 bg-cover bg-center" style={{ backgroundImage: "url('/images/slide2.jpg')" }}>
            <div className="h-full bg-black bg-opacity-50 flex items-center justify-center text-center text-white">
              <h1 className="text-4xl font-bold">Every Donation Counts</h1>
            </div>
          </div>
          <div className="h-72 bg-cover bg-center" style={{ backgroundImage: "url('/images/slide3.jpg')" }}>
            <div className="h-full bg-black bg-opacity-50 flex items-center justify-center text-center text-white">
              <h1 className="text-4xl font-bold">Be a Part of the Change</h1>
            </div>
          </div>
        </Slider>
      </section>

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
