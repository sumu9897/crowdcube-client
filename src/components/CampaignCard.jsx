import React from "react";
import { FaCalendarAlt, FaDollarSign } from "react-icons/fa";
import { Link } from "react-router-dom";

const CampaignCard = ({ campaign }) => {
  const { _id, title, image, type, donation, deadline, description } = campaign;

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      <img
        className="w-full h-48 object-cover"
        src={image}
        alt={title}
      />
      <div className="p-5">
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>

        {/* Campaign Type */}
        <p className="text-sm text-gray-600 mb-3">
          <span className="font-medium">Type:</span> {type}
        </p>

        {/* Minimum Donation */}
        <p className="flex items-center text-sm text-gray-600 mb-2">
          <FaDollarSign className="text-yellow-500 mr-1" />
          <span>
            Minimum Donation: <strong>${donation}</strong>
          </span>
        </p>

        {/* Deadline */}
        <p className="flex items-center text-sm text-gray-600 mb-4">
          <FaCalendarAlt className="text-yellow-500 mr-1" />
          <span>
            Deadline: <strong>{new Date(deadline).toLocaleDateString()}</strong>
          </span>
        </p>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {description}
        </p>

        {/* See More Button */}
        <Link
          to={`/campaign/${_id}`}
          className="inline-block w-full text-center px-4 py-2 bg-yellow-400 text-gray-900 rounded-md font-medium hover:bg-yellow-500 transition"
        >
          See More
        </Link>
      </div>
    </div>
  );
};

export default CampaignCard;
