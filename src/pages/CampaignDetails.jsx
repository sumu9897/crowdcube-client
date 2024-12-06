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
      .catch((err) => console.error(err));
  }, [id]);

  const handleDonate = () => {
    if (!user) {
      navigate(`/signin?redirect=/donate/${id}`);
      return;
    }
    navigate(`/donate/${id}`);
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

      <button onClick={handleDonate} className="btn btn-success mt-4">
        Donate
      </button>
    </div>
  );
};

export default CampaignDetails;
