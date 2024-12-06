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
    const campaign = {
      ...formData,
      userEmail: user?.email,
      userName: user?.displayName || "Anonymous",
    };

    try {
      const response = await fetch("http://localhost:3530/campaign", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(campaign),
      });
      const result = await response.json();
      if (result.insertedId) {
        toast.success("Campaign added successfully!");
        navigate("/myCampaign");
      } else {
        toast.error("Failed to add campaign!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add New Campaign</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
        <input
          type="text"
          name="title"
          placeholder="Campaign Title"
          value={formData.title}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="select select-bordered w-full"
          required
        >
          <option value="" disabled>Select Campaign Type</option>
          <option value="personal issue">Personal Issue</option>
          <option value="startup">Startup</option>
          <option value="business">Business</option>
          <option value="creative ideas">Creative Ideas</option>
        </select>
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="textarea textarea-bordered w-full"
          required
        ></textarea>
        <input
          type="number"
          name="minDonation"
          placeholder="Minimum Donation Amount"
          value={formData.minDonation}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
        <input
          type="date"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
        <input
          type="text"
          value={user?.email || ""}
          readOnly
          className="input input-bordered w-full bg-gray-200"
        />
        <input
          type="text"
          value={user?.displayName || "Anonymous"}
          readOnly
          className="input input-bordered w-full bg-gray-200"
        />
        <button type="submit" className="btn btn-primary w-full">
          Add Campaign
        </button>
      </form>
    </div>
  );
};

export default AddCampaign;
