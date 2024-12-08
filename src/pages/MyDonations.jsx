import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const MyDonations = () => {
  const { user } = useContext(AuthContext);
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/signin");
      return;
    }

    fetch(`https://crowdcube-server-lemon.vercel.app/myDonations?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setDonations(
          data.sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort donations by date (latest first)
        );
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch donations", err);
        toast.error("Failed to load your donations.");
        setLoading(false);
      });
  }, [user, navigate]);

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg max-w-3xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">My Donations</h2>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-xl text-gray-600">Loading your donations...</p>
        </div>
      ) : donations.length > 0 ? (
        <div className="space-y-4">
          {donations.map((donation) => (
            <div
              key={donation._id}
              className="p-6 border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out bg-gray-50"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800">{donation.campaignTitle}</h3>
                <p className="text-lg text-green-600 font-semibold">${donation.amount.toFixed(2)}</p>
              </div>
              <p className="text-sm text-gray-600">
                <strong>Date & Time:</strong> {new Date(donation.date).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-lg text-center text-gray-600">You haven't made any donations yet.</p>
      )}
    </div>
  );
};

export default MyDonations;
