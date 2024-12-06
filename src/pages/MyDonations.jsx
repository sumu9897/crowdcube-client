import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const MyDonations = () => {
  const { user } = useContext(AuthContext);
  const [donations, setDonations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/signin");
      return;
    }

    fetch(`http://localhost:3530/myDonations?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => setDonations(data))
      .catch((err) => {
        console.error("Failed to fetch donations", err);
        toast.error("Failed to load your donations.");
      });
  }, [user, navigate]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">My Donations</h2>

      {donations.length > 0 ? (
        <div>
          {donations.map((donation) => (
            <div
              key={donation._id}
              className="border p-4 mb-4 rounded shadow bg-white"
            >
              <p><strong>Campaign Title:</strong> {donation.campaignTitle}</p>
              <p><strong>Amount:</strong> ${donation.amount}</p>
              <p><strong>Date:</strong> {new Date(donation.date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No donations found.</p>
      )}
    </div>
  );
};

export default MyDonations;
