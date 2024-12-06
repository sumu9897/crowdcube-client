import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const MyCampaign = () => {
  const { user } = useContext(AuthContext);
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3530/campaign?userEmail=${user.email}`)
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

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this campaign?");
    if (!confirm) return;

    try {
      const response = await fetch(`http://localhost:3530/campaign/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();

      if (result.deletedCount > 0) {
        toast.success("Campaign deleted successfully!");
        setCampaigns((prev) => prev.filter((campaign) => campaign._id !== id));
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete campaign!");
    }
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
                  <td>
                    <Link to={`/updateCampaign/${campaign._id}`} className="btn btn-warning btn-sm mr-2">
                      Update
                    </Link>
                    <button
                      onClick={() => handleDelete(campaign._id)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No campaigns found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyCampaign;
