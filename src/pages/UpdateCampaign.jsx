import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import toast from "react-hot-toast";

const UpdateCampaign = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3530/campaign/${id}`)
      .then((res) => res.json())
      .then((data) => setFormData(data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3530/campaign/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (result.modifiedCount > 0) {
        toast.success("Campaign updated successfully!");
        navigate("/myCampaign");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update campaign!");
    }
  };

  if (!formData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Update Campaign</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          className="input input-bordered w-full"
        />
        <input
          type="text"
          name="title"
          placeholder="Campaign Title"
          value={formData.title}
          onChange={handleChange}
          className="input input-bordered w-full"
        />
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="select select-bordered w-full"
        >
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
        ></textarea>
        <input
          type="number"
          name="minDonation"
          placeholder="Minimum Donation Amount"
          value={formData.minDonation}
          onChange={handleChange}
          className="input input-bordered w-full"
        />
        <input
          type="date"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
          className="input input-bordered w-full"
        />
        <input
          type="text"
          value={user.email}
          readOnly
          className="input input-bordered w-full bg-gray-200"
        />
        <input
          type="text"
          value={user.displayName || "Anonymous"}
          readOnly
          className="input input-bordered w-full bg-gray-200"
        />
        <button type="submit" className="btn btn-primary w-full">
          Update Campaign
        </button>
      </form>
    </div>
  );
};

export default UpdateCampaign;
