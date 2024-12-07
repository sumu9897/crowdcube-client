import React, { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AddCampaign = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    image: "",
    title: "",
    type: "",
    description: "",
    minDonation: "",
    deadline: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate Minimum Donation
    if (formData.minDonation < 1) {
      toast.error("Minimum donation must be at least $1!");
      return;
    }

    const campaign = {
      ...formData,
      userEmail: user?.email,
      userName: user?.displayName || "Anonymous",
    };

    try {
      const response = await fetch("http://localhost:3530/campaign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(campaign),
      });

      const result = await response.json();

      if (result.insertedId) {
        toast.success("Campaign added successfully!");
        navigate("/myCampaign");
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
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Add New Campaign</h2>

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
          <option value="" disabled>Select Campaign Type</option>
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

        {/* User Email (Read-Only) */}
        <input
          type="text"
          value={user?.email || ""}
          readOnly
          className="input input-bordered w-full bg-gray-200"
        />
        
        {/* User Name (Read-Only) */}
        <input
          type="text"
          value={user?.displayName || "Anonymous"}
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
