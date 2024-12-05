import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    // Fetch all campaigns from the database
    fetch("http://localhost:3530/campaigns")
      .then((res) => res.json())
      .then((data) => {
        setCampaigns(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching campaigns:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-yellow-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-100 shadow-md rounded-md mt-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">All Campaigns</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-gray-800">
              <th className="border border-gray-300 px-4 py-2">Title</th>
              <th className="border border-gray-300 px-4 py-2">Type</th>
              <th className="border border-gray-300 px-4 py-2">Minimum Donation</th>
              <th className="border border-gray-300 px-4 py-2">Deadline</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((campaign) => (
              <tr key={campaign._id} className="text-center">
                <td className="border border-gray-300 px-4 py-2">{campaign.title}</td>
                <td className="border border-gray-300 px-4 py-2">{campaign.type}</td>
                <td className="border border-gray-300 px-4 py-2">${campaign.donation}</td>
                <td className="border border-gray-300 px-4 py-2">{new Date(campaign.deadline).toLocaleDateString()}</td>
                <td className="border border-gray-300 px-4 py-2">
                <Link
                    to={`/campaign/${campaign._id}`} // Use campaign._id
                    className="px-4 py-2 bg-yellow-400 text-gray-900 rounded-md hover:bg-yellow-500 transition"
                    >
                    See Details
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

export default AllCampaigns;
