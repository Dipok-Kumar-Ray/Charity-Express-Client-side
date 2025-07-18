import { Link } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";

const AllDonation = () => {
  const [donations, setDonations] = useState([]);
  const axiosSecure = useAxiosSecure();
//   const axiosSecure = useAxiosSecure();

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

  return (
    <div className="min-h-screen bg-gradient-to-tr from-green-50 to-white dark:from-gray-900 dark:to-gray-800 p-6">
      <h2 className="text-3xl font-bold text-center mb-10 text-green-700 dark:text-green-200">
        All Available Donations
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {donations.map((donation) => (
          <div
            key={donation._id}
            className="group relative bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 transition-transform hover:scale-105 hover:shadow-2xl duration-300"
          >
            {/* Image */}
            <img
              src={donation.image}
              alt={donation.title}
              className="h-48 w-full object-cover rounded-xl mb-4"
            />
    console.log(donation.image);
            {/* Title */}
            <h3 className="text-xl font-semibold text-green-700 dark:text-green-200 mb-2">
              {donation.title}
            </h3>

            {/* Info */}
            <p className="text-gray-600 dark:text-gray-300 mb-1">
              🍽️ <strong>Restaurant:</strong> {donation.restaurantName} ({donation.location})
            </p>

            <p className="text-gray-600 dark:text-gray-300 mb-1">
              🤝 <strong>Charity:</strong>{" "}
              {donation.charityName || "Not assigned"}
            </p>

            <p className="text-gray-600 dark:text-gray-300 mb-1">
              📦 <strong>Quantity:</strong> {donation.quantity}
            </p>

            {/* Status */}
            <span
              className={`inline-block text-xs font-semibold mt-2 mb-3 px-3 py-1 rounded-full ${
                donation.status === "Available"
                  ? "bg-green-100 text-green-700"
                  : donation.status === "Picked Up"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {donation.status}
            </span>

            {/* View Details Button */}
            <Link
              to={`/donations/${donation._id}`}
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
