import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import toast from "react-hot-toast";

const DonateForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [amount, setAmount] = useState("");
  const [campaignTitle, setCampaignTitle] = useState("");

  // Fetch campaign details to get the title
  useEffect(() => {
    fetch(`http://localhost:3530/campaign/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCampaignTitle(data.title);
      })
      .catch((err) => console.error("Failed to fetch campaign title:", err));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid donation amount.");
      return;
    }

    const donation = {
      campaignId: id,
      campaignTitle,  // Include campaign title
      userEmail: user.email,
      userName: user.displayName || "Anonymous",
      amount: parseFloat(amount),
      date: new Date(),
    };

    try {
      const response = await fetch("http://localhost:3530/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(donation),
      });

      const result = await response.json();

      if (result.insertedId) {
        toast.success("Donation successful! Thank you.");
        navigate(`/myDonations`);
      } else {
        toast.error("Donation failed. Please try again.");
      }
    } catch (error) {
      console.error("Donation Error:", error);
      toast.error("An error occurred while processing your donation.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Donate to Campaign</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          placeholder="Enter your donation amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="input"
          required
        />
        <button type="submit" className="btn btn-success mt-2">
          Donate Now
        </button>
      </form>
    </div>
  );
};

export default DonateForm;
