import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const MyCampaign = () => {
  const { user } = useContext(AuthContext);
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3530/campaign?userEmail=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("Fetched campaigns:", data);  // Debug log
          setCampaigns(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
          toast.error("Failed to fetch campaigns!");
        });
    }
  }, [user]);

  const handleDelete = async () => {
    if (selectedCampaign) {
      try {
        const response = await fetch(`http://localhost:3530/campaign/${selectedCampaign}`, {
          method: "DELETE",
        });
        const result = await response.json();

        if (result.deletedCount > 0) {
          toast.success("Campaign deleted successfully!");
          setCampaigns((prev) =>
            prev.filter((campaign) => campaign._id !== selectedCampaign)
          );
        } else {
          toast.error("Failed to delete campaign.");
        }
      } catch (error) {
        console.error(error);
        toast.error("An error occurred while deleting the campaign.");
      }
    }
    setShowModal(false);
    setSelectedCampaign(null);
  };

  const openModal = (id) => {
    setSelectedCampaign(id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCampaign(null);
  };

  const calculateTotalDonations = (campaign) => {
    return campaign.totalDonations || 0;
  };

  if (loading) return <p>Loading campaigns...</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Campaigns</h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Type</th>
              <th>Total Donations</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {campaigns.length > 0 ? (
              campaigns.map((campaign, index) => (
                <tr key={campaign._id}>
                  <td>{index + 1}</td>
                  <td>{campaign.title}</td>
                  <td>{campaign.type}</td>

                  {/* Calculate and display the total donations */}
                  <td>${calculateTotalDonations(campaign)}</td>

                  <td>
                    <Link
                      to={`/updateCampaign/${campaign._id}`}
                      className="btn btn-warning btn-sm mr-2"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => openModal(campaign._id)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No campaigns found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for confirmation before deletion */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="text-xl font-bold mb-4">Confirm Deletion</h3>
            <p>Are you sure you want to delete this campaign?</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={closeModal}
                className="btn btn-secondary mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="btn btn-danger"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCampaign;
