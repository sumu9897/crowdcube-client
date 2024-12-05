import React from "react";
import { FaPlus, FaCalendarAlt, FaDollarSign } from "react-icons/fa";
import Swal from 'sweetalert2'

function AddCampaign() {
  const userName = "John Doe"; // Replace with dynamic data if available
  const userEmail = "johndoe@example.com"; // Replace with dynamic data if available
  const handleAddCampaign = event =>{
    event.preventDefault();

    const form = event.target;

    const title = form.title.value;
    const image = form.image.value;
    const type = form.type.value;
    const description = form.description.value;
    const donation = form.donation.value;
    const deadline = form.deadline.value;
    const email = form.email.value;
    const name = form.name.value;

    const newCampaign = {title, image, type, description, donation, deadline,email,name}
    console.log(newCampaign);

    fetch('http://localhost:3530/campaign',{
        method :'POST',
        headers: {
            'content-type': 'application/json'
        },
        body : JSON.stringify(newCampaign)
    })
    .then(res=> res.json())
    .then(data => {
        console.log(data);
        if(data.insertedId){
            Swal.fire({
                title: 'Success!',
                text: 'Campaing Addes Successfully',
                icon : 'success',
                confirmButtonText : 'Cool'
            })
        }
    })
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-100 shadow-md rounded-md mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Campaign</h2>
      <form onSubmit={handleAddCampaign} className="space-y-6">
        {/* Image URL */}
        <div>
          <label htmlFor="image" className="block text-gray-700 font-medium mb-2">
            Image/Thumbnail URL
          </label>
          <input
            type="url"
            id="image"
            name="image"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="Enter image URL"
          />
        </div>

        {/* Campaign Title */}
        <div>
          <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
            Campaign Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="Enter campaign title"
          />
        </div>

        {/* Campaign Type */}
        <div>
          <label htmlFor="type" className="block text-gray-700 font-medium mb-2">
            Campaign Type
          </label>
          <select
            id="type"
            name="type"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option value="personal">Personal Issue</option>
            <option value="startup">Startup</option>
            <option value="business">Business</option>
            <option value="creative">Creative Ideas</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows="4"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="Enter campaign description"
          ></textarea>
        </div>

        {/* Minimum Donation Amount */}
        <div>
          <label htmlFor="donation" className="block text-gray-700 font-medium mb-2">
            Minimum Donation Amount
          </label>
          <div className="flex items-center">
            <FaDollarSign className="text-gray-500 mr-2" />
            <input
              type="number"
              id="donation"
              name="donation"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Enter minimum donation amount"
            />
          </div>
        </div>

        {/* Deadline */}
        <div>
          <label htmlFor="deadline" className="block text-gray-700 font-medium mb-2">
            Deadline
          </label>
          <div className="flex items-center">
            <FaCalendarAlt className="text-gray-500 mr-2" />
            <input
              type="date"
              id="deadline"
              name="deadline"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
        </div>

        {/* User Email */}
        <div>
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
            User Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-4 py-2 border rounded-md bg-gray-200 text-gray-600 cursor-not-allowed"
            value={userEmail}
            readOnly
          />
        </div>

        {/* User Name */}
        <div>
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
            User Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full px-4 py-2 border rounded-md bg-gray-200 text-gray-600 cursor-not-allowed"
            value={userName}
            readOnly
          />
        </div>

        {/* Add Button */}
        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-2 bg-yellow-400 text-gray-900 rounded-md font-medium hover:bg-yellow-500 transition flex items-center justify-center space-x-2"
          >
            <FaPlus />
            <span>Add Campaign</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddCampaign;
