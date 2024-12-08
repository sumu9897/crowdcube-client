import React, { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const AddCampaign = () => {
  const { user } = useContext(AuthContext); // Access user information from context
  const [formData, setFormData] = useState({
    image: "",
    title: "",
    type: "",
    description: "",
    minDonation: "",
    deadline: "",
    userName: user?.displayName || "", // Use the logged-in user's display name
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation
    if (!formData.image) return toast.error("Please provide a valid image URL!");
    if (!formData.title) return toast.error("Campaign title is required!");
    if (!formData.type) return toast.error("Please select a campaign type!");
    if (!formData.description) return toast.error("Description is required!");
    if (formData.minDonation <= 0) return toast.error("Minimum donation must be positive!");
    if (new Date(formData.deadline) <= new Date())
      return toast.error("Deadline must be a future date!");

    if (!user?.email) return toast.error("User is not logged in!");

    const campaign = {
      ...formData,
      userEmail: user?.email,
    };

    try {
      const response = await fetch("http://localhost:3530/campaign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(campaign),
      });

      const result = await response.json();

      if (result.insertedId) {
        toast.success("New campaign added successfully!");
        // Delay navigation to ensure the toast is visible
        setTimeout(() => navigate("/myCampaign"), 1500);
      } else {
        toast.error("Failed to add campaign. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong! Please check the server.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <Toaster position="top-right" /> {/* Ensure Toaster is included */}
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Add New Campaign</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Image URL */}
        <input
          type="text"
          name="image"
          placeholder="Campaign Image URL"
          value={formData.image}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />

        {/* Campaign Title */}
        <input
          type="text"
          name="title"
          placeholder="Campaign Title"
          value={formData.title}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />

        {/* Campaign Type */}
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="select select-bordered w-full"
          required
        >
          <option value="" disabled>
            Select Campaign Type
          </option>
          <option value="Personal Issue">Personal Issue</option>
          <option value="Startup">Startup</option>
          <option value="Business">Business</option>
          <option value="Creative Ideas">Creative Ideas</option>
        </select>

        {/* Description */}
        <textarea
          name="description"
          placeholder="Campaign Description"
          value={formData.description}
          onChange={handleChange}
          className="textarea textarea-bordered w-full"
          rows="4"
          required
        ></textarea>

        {/* Minimum Donation */}
        <input
          type="number"
          name="minDonation"
          placeholder="Minimum Donation Amount"
          value={formData.minDonation}
          onChange={handleChange}
          className="input input-bordered w-full"
          min="1"
          required
        />

        {/* Deadline */}
        <input
          type="date"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />

        {/* User Name */}
        <input
          type="text"
          name="userName"
          placeholder="Your Name"
          value={user?.displayName || ""}
          className="input input-bordered w-full"
          readOnly
        />

        {/* User Email (Read-Only) */}
        <input
          type="text"
          value={user?.email || ""}
          readOnly
          className="input input-bordered w-full bg-gray-200"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-primary w-full bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition"
        >
          Add Campaign
        </button>
      </form>
    </div>
  );
};

export default AddCampaign;
