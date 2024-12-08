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
  const [name, setName] = useState(user?.displayName || "Anonymous");
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [donationAmount, setDonationAmount] = useState(0); // Store the donation amount

  // Fetch campaign details to get the title
  useEffect(() => {
    fetch(`https://crowdcube-server-lemon.vercel.app/campaign/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCampaignTitle(data.title);
      })
      .catch((err) => console.error("Failed to fetch campaign title:", err));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate if the amount is provided and greater than 0
    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid donation amount.");
      return;
    }

    const donation = {
      campaignId: id,
      campaignTitle, // Include campaign title
      userEmail: user.email,
      userName: name,
      amount: parseFloat(amount),
      message,
      date: new Date(),
    };

    try {
      const response = await fetch("https://crowdcube-server-lemon.vercel.app/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(donation),
      });

      const result = await response.json();

      if (result.insertedId) {
        setDonationAmount(parseFloat(amount)); // Set the donation amount
        setShowModal(true); // Show the modal
        navigate(`/myDonations`);
      } else {
        toast.error("Donation failed. Please try again.");
      }
    } catch (error) {
      console.error("Donation Error:", error);
      toast.error("An error occurred while processing your donation.");
    }
  };

  const closeModal = () => {
    setShowModal(false); // Close the modal
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg max-w-lg">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Donate to {campaignTitle}</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-lg font-medium text-gray-700">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 block w-full px-4 py-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your Name (Optional)"
          />
        </div>

        <div>
          <label htmlFor="amount" className="block text-lg font-medium text-gray-700">
            Donation Amount ($)
          </label>
          <input
            type="number"
            id="amount"
            placeholder="Enter your donation amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-2 block w-full px-4 py-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            min="1" // Ensure the amount is always positive
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-lg font-medium text-gray-700">
            Message to the Campaign (Optional)
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mt-2 block w-full px-4 py-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write a message to the campaign team"
            rows="4"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg text-xl shadow-md focus:outline-none focus:ring-4 focus:ring-green-200"
        >
          Donate Now
        </button>
      </form>

      {/* Modal for donation success */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full">
            <h3 className="text-2xl font-bold text-green-600 mb-4">Donation Successful!</h3>
            <p className="text-lg text-gray-800">You have successfully donated ${donationAmount.toFixed(2)} to the campaign.</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={closeModal}
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonateForm;
