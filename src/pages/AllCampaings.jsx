import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllCampaings = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        <button
          onClick={handleSort}
          className="px-5 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none transition-all"
        >
          Sort by Min Donation {sortOrder === "asc" ? "▲" : "▼"}
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
        <table className="min-w-full table-auto">
          <thead className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
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
                <td className="py-3 px-6 text-gray-800 font-semibold">{campaign.title}</td>
                <td className="py-3 px-6 text-gray-600">{campaign.type}</td>
                <td className="py-3 px-6 font-bold text-gray-900">${campaign.minDonation}</td>
                <td className="py-3 px-6 text-gray-600">
                  {new Date(campaign.deadline).toLocaleDateString()}
                </td>
                <td className="py-3 px-6">
                  <Link
                    to={`/campaign/${campaign._id}`}
                    className="inline-block bg-yellow-500 text-gray-900 rounded px-4 py-2 font-medium hover:bg-yellow-600 transition-all"
                  >
                    See More
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllCampaings;
