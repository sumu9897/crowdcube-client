import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import toast from "react-hot-toast";

const CampaignDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [campaign, setCampaign] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3530/campaign/${id}`)
      .then((res) => res.json())
      .then((data) => setCampaign(data))
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load campaign details.");
      });
  }, [id]);

  const handleDonate = () => {
    if (!user) {
      navigate(`/signin?redirect=/donate/${id}`);
      return;
    }
    navigate(`/donate/${id}`);
  };

  if (!campaign) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center text-center">
        <div className="max-w-lg">
          <img
            className="w-full rounded-md shadow-md mb-6"
            src={campaign.image}
            alt={campaign.title}
          />
        </div>
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          {campaign.title}
        </h2>
        <p className="text-lg text-gray-600 mb-2">
          <strong>Type:</strong> {campaign.type}
        </p>
        <p className="text-lg text-gray-600 mb-2">
          <strong>Minimum Donation:</strong> ${campaign.minDonation}
        </p>
        <p className="text-lg text-gray-600 mb-4">
          <strong>Deadline:</strong>{" "}
          {new Date(campaign.deadline).toLocaleDateString()}
        </p>
        <p className="text-gray-700 text-justify leading-relaxed mb-6 max-w-3xl">
          <strong>Description:</strong> {campaign.description}
        </p>
        <button
          onClick={handleDonate}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md text-lg shadow-md"
        >
          Donate Now
        </button>
      </div>
    </div>
  );
};

export default CampaignDetails;
