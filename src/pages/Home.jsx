import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Fade } from "react-awesome-reveal";
import { Tooltip } from "react-tooltip";
import Banner from "../components/Banner";

import SuccessStories from "../components/SuccessStories";
import { AiOutlineQuestionCircle, AiOutlineSun, AiOutlineMoon } from "react-icons/ai";
import { Typewriter } from "react-simple-typewriter";

const Home = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const navigate = useNavigate();

  // Fetch active campaigns
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

  return (
    <div className={isDarkTheme ? "dark bg-gray-900 text-white" : "bg-white"}>
      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 p-2 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition"
      >
        {isDarkTheme ? (
          <AiOutlineSun className="text-2xl" title="Switch to Light Mode" />
        ) : (
          <AiOutlineMoon className="text-2xl" title="Switch to Dark Mode" />
        )}
      </button>

      {/* Banner Section */}
      <Banner />

      {/* Running Campaigns Section */}
      <section className="mb-12 px-6">
  <h2 className="text-3xl font-bold text-center mb-8">
    Running Campaigns
  </h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {campaigns.map((campaign) => (
      <Fade key={campaign._id}>
        <div className="flex flex-col h-full rounded-lg overflow-hidden shadow-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600">
          <img
            src={campaign.image}
            alt={campaign.title}
            className="h-48 w-full object-cover"
          />
          <div className="flex flex-col justify-between p-4 h-full">
            <h3 className="font-bold text-xl mt-2 text-gray-800 dark:text-gray-100">
              {campaign.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mt-2 flex-grow">
              {campaign.description.slice(0, 100)}...
            </p>
            <button
              data-tip="View more campaign details"
              onClick={() => navigate(`/campaign/${campaign._id}`)}
              className="mt-4 px-4 py-2 bg-yellow-400 text-gray-900 rounded hover:bg-yellow-500 transition dark:bg-yellow-500 dark:hover:bg-yellow-600"
            >
              See More
            </button>
            <Tooltip />
          </div>
        </div>
      </Fade>
    ))}
  </div>
</section>


            {/* FAQ Section */}
            <section className="px-6 py-12 bg-gray-50 dark:bg-gray-900">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
                <Typewriter
                words={["Frequently Asked Questions"]}
                loop={false}
                cursor
                cursorStyle="_"
                typeSpeed={70}
                deleteSpeed={50}
                />
            </h2>
            <div className="space-y-4">
                <div className="p-4 bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-300 dark:border-gray-600">
                <h3 className="text-xl font-semibold flex items-center text-gray-900 dark:text-gray-100">
                    <AiOutlineQuestionCircle className="mr-2" /> What is this platform about?
                </h3>
                <p className="mt-2 text-gray-700 dark:text-gray-300">
                    This platform helps connect donors and communities in need through transparent and efficient fundraising campaigns.
                </p>
                </div>
                <div className="p-4 bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-300 dark:border-gray-600">
                <h3 className="text-xl font-semibold flex items-center text-gray-900 dark:text-gray-100">
                    <AiOutlineQuestionCircle className="mr-2" /> How can I donate?
                </h3>
                <p className="mt-2 text-gray-700 dark:text-gray-300">
                    Simply browse through the running campaigns and click "Donate Now" to contribute securely.
                </p>
                </div>
                <div className="p-4 bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-300 dark:border-gray-600">
                <h3 className="text-xl font-semibold flex items-center text-gray-900 dark:text-gray-100">
                    <AiOutlineQuestionCircle className="mr-2" /> Is my donation secure?
                </h3>
                <p className="mt-2 text-gray-700 dark:text-gray-300">
                    Yes, we use industry-standard security measures to protect your transactions.
                </p>
                </div>
            </div>
            </section>


      <SuccessStories />
    </div>
  );
};

export default Home;
