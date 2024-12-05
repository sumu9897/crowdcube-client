import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CampaignDetails = () => {
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

    useEffect(() => {
    fetch(`http://localhost:3530/campaign/${id}`)
        .then((res) => res.json())
        .then((data) => {
        setCampaign(data);
        setLoading(false);
        })
        .catch((error) => {
        console.error("Error fetching campaign details:", error);
        setLoading(false);
        });
    }, [id]);


  if (loading) {
    return <div>Loading...</div>;
  }

  if (!campaign) {
    return <div>No campaign found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 shadow-md rounded-md mt-10">
        <figure><img src={campaign.image} /></figure>
      <h1 className="text-3xl font-bold mb-4">{campaign.title}</h1>
      <p><strong>Type:</strong> {campaign.type}</p>
      <p><strong>Minimum Donation:</strong> ${campaign.donation}</p>
      <p><strong>Deadline:</strong> {new Date(campaign.deadline).toLocaleDateString()}</p>
      <p><strong>Description:</strong> {campaign.description}</p>
    </div>
  );
};

export default CampaignDetails;
