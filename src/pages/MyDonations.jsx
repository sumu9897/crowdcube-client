import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";

const MyDonations = () => {
  const { user } = useContext(AuthContext);
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3530/donations?userEmail=${user.email}`)
      .then((res) => res.json())
      .then((data) => setDonations(data))
      .catch((err) => console.error(err));
  }, [user]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Donations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {donations.length > 0 ? (
          donations.map((donation) => (
            <div
              key={donation._id}
              className="card shadow-lg bg-white p-4 rounded-lg"
            >
              <img
                src={donation.image}
                alt={donation.title}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="text-lg font-semibold">{donation.title}</h3>
              <p className="text-sm text-gray-600">{donation.description}</p>
              <div className="mt-2 text-sm">
                <p>
                  <span className="font-semibold">Type:</span> {donation.type}
                </p>
                <p>
                  <span className="font-semibold">Donated Amount:</span> $
                  {donation.amount}
                </p>
                <p>
                  <span className="font-semibold">Donation Date:</span>{" "}
                  {new Date(donation.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-center col-span-3">
            You haven't made any donations yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default MyDonations;
