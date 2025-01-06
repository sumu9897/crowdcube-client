import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { MdDeleteForever } from "react-icons/md";


const MyCampaign = () => {
  const { user } = useContext(AuthContext);
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  useEffect(() => {
    if (user?.email) {
      fetch(`https://crowdcube-server-lemon.vercel.app/campaign?userEmail=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
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
        const response = await fetch(`https://crowdcube-server-lemon.vercel.app/campaign/${selectedCampaign}`, {
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

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-600">Loading campaigns...</div>
      </div>
    );

  return (
    <div className="container mx-auto p-6">
      <Toaster position="top-right" />

      <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">
        My Campaigns
      </h2>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="table-auto w-full bg-white border border-gray-200">
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr>
              <th className="px-4 py-2 text-left font-semibold text-gray-600">#</th>
              <th className="px-4 py-2 text-left font-semibold text-gray-600">Title</th>
              <th className="px-4 py-2 text-left font-semibold text-gray-600">Type</th>
              <th className="px-4 py-2 text-left font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>

          <tbody>
            {campaigns.length > 0 ? (
              campaigns.map((campaign, index) => (
                <tr
                  key={campaign._id}
                  className="hover:bg-gray-50 transition border-b"
                >
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2 font-medium text-gray-800">
                    {campaign.title}
                  </td>
                  <td className="px-4 py-2 text-gray-600">{campaign.type}</td>
                  <td className="px-4 py-2 items-center flex">
                    <Link
                      to={`/updateCampaign/${campaign._id}`}
                      className="px-4 py-2 text-white bg-secondary hover:bg-green-300 hover:text-black rounded shadow-md transition inline-block mr-2"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => openModal(campaign._id)}
                      className="px-5 py-2 text-black hover:bg-red-500 hover:text-white rounded shadow-md transition"
                    >
                      <MdDeleteForever className="size-6" />

                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-4 text-gray-600 font-medium"
                >
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
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              Confirm Deletion
            </h3>
            <p className="text-gray-600">
              Are you sure you want to delete this campaign? This action cannot
              be undone.
            </p>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
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
