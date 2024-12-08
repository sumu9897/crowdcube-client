import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import toast, { Toaster } from "react-hot-toast";

const UpdateCampaign = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    fetch(`https://crowdcube-server-lemon.vercel.app/campaign/${id}`)
      .then((res) => res.json())
      .then((data) => setFormData(data))
      .catch((err) => {
        console.error("Error fetching campaign:", err);
        toast.error("Failed to load campaign data!");
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`https://crowdcube-server-lemon.vercel.app/campaign/${id}`, {
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
      } else {
        toast.error("No changes were made to the campaign.");
      }
    } catch (error) {
      console.error("Error updating campaign:", error);
      toast.error("Failed to update campaign!");
    }
  };

  if (!formData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg text-gray-500">Loading campaign details...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Update Campaign
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Campaign Image URL
            </label>
            <input
              type="text"
              name="image"
              placeholder="Enter the image URL"
              value={formData.image || ""}
              onChange={handleChange}
              className="input input-bordered w-full mt-1"
              required
            />
          </div>

          {/* Campaign Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Campaign Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Enter the campaign title"
              value={formData.title || ""}
              onChange={handleChange}
              className="input input-bordered w-full mt-1"
              required
            />
          </div>

          {/* Campaign Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Campaign Type
            </label>
            <select
              name="type"
              value={formData.type || ""}
              onChange={handleChange}
              className="select select-bordered w-full mt-1"
              required
            >
              <option value="" disabled>
                Select a campaign type
              </option>
              <option value="Personal Issue">Personal Issue</option>
              <option value="Startup">Startup</option>
              <option value="Business">Business</option>
              <option value="Creative Ideas">Creative Ideas</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Enter a detailed description of the campaign"
              value={formData.description || ""}
              onChange={handleChange}
              className="textarea textarea-bordered w-full mt-1"
              rows="4"
              required
            ></textarea>
          </div>

          {/* Minimum Donation */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Minimum Donation
            </label>
            <input
              type="number"
              name="minDonation"
              placeholder="Enter the minimum donation amount"
              value={formData.minDonation || ""}
              onChange={handleChange}
              className="input input-bordered w-full mt-1"
              min="1"
              required
            />
          </div>

          {/* Deadline */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Deadline
            </label>
            <input
              type="date"
              name="deadline"
              value={formData.deadline ? formData.deadline.split("T")[0] : ""}
              onChange={handleChange}
              className="input input-bordered w-full mt-1"
              required
            />
          </div>

          {/* User Info (Read-Only) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Your Email
            </label>
            <input
              type="text"
              value={user?.email || "Anonymous"}
              readOnly
              className="input input-bordered w-full bg-gray-200 mt-1"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="btn btn-primary w-full bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition"
            >
              Update Campaign
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCampaign;
