import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllCampaings = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    fetch("http://localhost:3530/campaign")
      .then((res) => res.json())
      .then((data) => setCampaigns(data))
      .catch((err) => console.error(err));
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

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold text-gray-800">All Campaigns</h2>
        <button
          onClick={handleSort}
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition"
        >
          Sort by Min Donation {sortOrder === "asc" ? "▲" : "▼"}
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="table w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left font-medium">#</th>
              <th className="py-2 px-4 text-left font-medium">Title</th>
              <th className="py-2 px-4 text-left font-medium">Type</th>
              <th className="py-2 px-4 text-left font-medium">Min Donation</th>
              <th className="py-2 px-4 text-left font-medium">Deadline</th>
              <th className="py-2 px-4 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((campaign, index) => (
              <tr
                key={campaign._id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4 font-semibold text-gray-800">
                  {campaign.title}
                </td>
                <td className="py-2 px-4 text-gray-600">{campaign.type}</td>
                <td className="py-2 px-4 font-bold">
                  ${campaign.minDonation}
                </td>
                <td className="py-2 px-4">
                  {new Date(campaign.deadline).toLocaleDateString()}
                </td>
                <td className="py-2 px-4">
                  <Link
                    to={`/campaign/${campaign._id}`}
                    className="inline-block bg-yellow-500 text-gray-900 rounded px-4 py-2 font-medium hover:bg-yellow-600 transition"
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
