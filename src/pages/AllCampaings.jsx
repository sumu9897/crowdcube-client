import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaTh, FaList } from "react-icons/fa";
import CampaignCard from "../components/CampaignCard";
const AllCampaings = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCardView, setIsCardView] = useState(false); // Toggle between table and card view

  useEffect(() => {
    fetch("https://crowdcube-server-lemon.vercel.app/campaign")
      .then((res) => res.json())
      .then((data) => {
        setCampaigns(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load campaigns.");
        setLoading(false);
      });
  }, []);

  const handleSort = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);

    const sortedCampaigns = [...campaigns].sort((a, b) => {
      return newSortOrder === "asc"
        ? a.minDonation - b.minDonation
        : b.minDonation - a.minDonation;
    });

    setCampaigns(sortedCampaigns);
  };

  const toggleView = () => {
    setIsCardView((prev) => !prev);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="text-xl text-gray-700">Loading campaigns...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="text-xl text-red-600">{error}</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800">All Campaigns</h2>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleSort}
            className="px-5 py-3 bg-secondary text-black font-semibold rounded-lg shadow-md hover:bg-green-300 focus:outline-none transition-all"
          >
            Sort by Min Donation {sortOrder === "asc" ? "▲" : "▼"}
          </button>
          <button
            onClick={toggleView}
            className="p-3 bg-secondary rounded-lg shadow-md hover:bg-green-300 focus:outline-none transition-all"
            title={`Switch to ${isCardView ? "Table" : "Card"} View`}
          >
            {isCardView ? <FaList size={20} /> : <FaTh size={20} />}
          </button>
        </div>
      </div>

      {isCardView ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((campaign) => (
            <CampaignCard key={campaign._id} campaign={campaign} />
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
          <table className="min-w-full table-auto">
            <thead className="bg-gradient-to-r from-primary to-blue-500 text-white">
              <tr>
                <th className="py-3 px-6 text-left">#</th>
                <th className="py-3 px-6 text-left">Title</th>
                <th className="py-3 px-6 text-left">Type</th>
                <th className="py-3 px-6 text-left">Min Donation</th>
                <th className="py-3 px-6 text-left">Deadline</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((campaign, index) => (
                <tr
                  key={campaign._id}
                  className="border-t hover:bg-gray-50 transition-all duration-200"
                >
                  <td className="py-3 px-6 text-gray-700">{index + 1}</td>
                  <td className="py-3 px-6 text-gray-800 font-semibold">
                    {campaign.title}
                  </td>
                  <td className="py-3 px-6 text-gray-600">{campaign.type}</td>
                  <td className="py-3 px-6 font-bold text-gray-900">
                    ${campaign.minDonation}
                  </td>
                  <td className="py-3 px-6 text-gray-600">
                    {new Date(campaign.deadline).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-6">
                    <Link
                      to={`/campaign/${campaign._id}`}
                      className="inline-block bg-secondary text-gray-900 rounded px-4 py-2 font-medium hover:bg-green-300 transition-all"
                    >
                      See More
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllCampaings;
