import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import toast from "react-hot-toast";

const CampaignDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [campaign, setCampaign] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3530/campaign/${id}`)
      .then((res) => res.json())
      .then((data) => setCampaign(data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleDonate = async () => {
    const donation = {
      campaignId: id,
      campaignTitle: campaign.title,
      userEmail: user.email,
      userName: user.displayName || "Anonymous",
    };

    try {
      const response = await fetch("http://localhost:3530/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(donation),
      });
      const result = await response.json();
      if (result.insertedId) {
        toast.success("Thank you for your donation!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to process donation!");
    }
  };

  if (!campaign) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold">{campaign.title}</h2>
      <p><strong>Type:</strong> {campaign.type}</p>
      <p><strong>Description:</strong> {campaign.description}</p>
      <p><strong>Minimum Donation:</strong> ${campaign.minDonation}</p>
      <p><strong>Deadline:</strong> {new Date(campaign.deadline).toLocaleDateString()}</p>
      <button onClick={handleDonate} className="btn btn-success">
        Donate
      </button>
    </div>
  );
};

export default CampaignDetails;
