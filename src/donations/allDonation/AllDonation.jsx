// import { Link } from "react-router";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import { useEffect, useState } from "react";

import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router";

const AllDonation = () => {
  const [donations, setDonations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const res = await axiosSecure.get("/donations");
        setDonations(res.data);
      } catch (error) {
        console.error("Failed to fetch donations", error);
      }
    };
    fetchDonations();
  }, [axiosSecure]);

  // ✅ Filter by search (location)
  const filteredDonations = donations
    .filter((donation) =>
      donation.location.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === "quantity") {
        return b.quantity - a.quantity;
      } else if (sortOption === "pickupTime") {
        return new Date(a.pickupTime) - new Date(b.pickupTime);
      }
      return 0;
    });

  return (
    <div className="min-h-screen bg-gradient-to-tr from-green-50 to-white dark:from-gray-900 dark:to-gray-800 p-6">
      <h2 className="text-3xl font-bold text-center mb-10 text-green-700 dark:text-green-200">
        All Available Donations
      </h2>

      {/* ✅ Search & Sort Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
        <input
          type="text"
          placeholder="Search by city or zip..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-xl w-full sm:w-1/2 dark:bg-gray-800 dark:text-white"
        />

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-xl w-full sm:w-1/4 dark:bg-gray-800 dark:text-white"
        >
          <option value="">Sort By</option>
          <option value="quantity">Quantity</option>
          <option value="pickupTime">Pickup Time</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredDonations.map((donation) => (
          <div
            key={donation._id}
            className="group relative dark:bg-gray-800 p-5 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 transition duration-300 hover:bg-green-50 hover:shadow-xl hover:border-green-400 dark:hover:bg-gray-700"
          >
            {/* Image */}
            <img
              src={donation.image}
              alt={donation.title}
              className="h-48 w-full object-cover rounded-xl mb-4"
            />
            {/* Title */}
            <h3 className="text-xl font-semibold text-green-700 dark:text-green-200 mb-2">
              {donation.title}
            </h3>

            {/* Info */}
            <p className="text-gray-600 dark:text-gray-300 mb-1">
              🍽️ <strong>Restaurant:</strong> {donation.restaurantName} (
              {donation.location})
            </p>

            <p className="text-gray-600 dark:text-gray-300 mb-1">
              🤝 <strong>Charity:</strong>{" "}
              {donation.charityName || "Not assigned"}
            </p>

            <p className="text-gray-600 dark:text-gray-300 mb-1">
              📦 <strong>Quantity:</strong> {donation.quantity}
            </p>

            <p className="text-gray-600 dark:text-gray-300 mb-1">
              ⏰ <strong>Pickup Time:</strong>{" "}
              {donation.pickupTime
                ? new Date(donation.pickupTime).toLocaleString()
                : "N/A"}
            </p>

            {/* Status */}
            <span
              className={`inline-block text-xs font-semibold mt-2 mb-3 px-3 py-1 rounded-full ${
                donation.status === "Available"
                  ? " text-green-700"
                  : donation.status === "Picked Up"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {donation.status}
            </span>

            {/* View Details Button */}
            <Link
              to={`/donationDetails/${donation._id}`}
              className="block text-center bg-green-600 text-white font-medium py-2 px-4 rounded-xl mt-2 hover:bg-green-700 transition duration-200"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllDonation;
