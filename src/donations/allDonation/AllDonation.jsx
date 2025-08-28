import { useState } from "react";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AllDonation = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const axiosSecure = useAxiosSecure();

  // Fetch donations using React Query
  const {
    data: donations = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["donations"],
    queryFn: async () => {
      const res = await axiosSecure.get("/donations");
      return res.data;
    },
  });

  // Loading state
  if (isLoading)
    return (
      <div className="flex justify-center items-center h-72">
        <span className="loading loading-spinner text-green-600 scale-150"></span>
      </div>
    );

  // Error state
  if (isError)
    return (
      <div className="text-center text-red-500 py-10 text-lg">
        Failed to load donations 😔
      </div>
    );

  // Filter only available/verified/pickedup
  const visibleDonations = donations.filter((donation) => {
    const status = donation.status?.toLowerCase();
    return (
      status === "available" ||
      status === "verified" ||
      status === "pickedup"
    );
  });

  // Search filter (case insensitive)
  const searchedDonations = visibleDonations.filter((donation) =>
    donation.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort logic
  const sortedDonations = [...searchedDonations].sort((a, b) => {
    if (sortOption === "quantity") {
      return Number(b.quantity) - Number(a.quantity); // High to Low
    } else if (sortOption === "pickupTime") {
      return new Date(a.pickupTime) - new Date(b.pickupTime); // Soonest First
    }
    return 0;
  });

  const getStatusBadge = (status) => {
    const lower = status?.toLowerCase();
    if (lower === "available" || lower === "verified")
      return "bg-green-100 text-green-700";
    if (lower === "pickedup") return "bg-gray-200 text-gray-600";
    if (lower === "pending") return "bg-yellow-100 text-yellow-700";
    return "bg-gray-200 text-gray-600";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-10 text-green-700 dark:text-green-200 tracking-wide">
        All Available Donations
      </h2>

      {/* Search & Sort */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4 max-w-6xl mx-auto">
        <input
          type="text"
          placeholder="🔍 Search by Location ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-xl w-full sm:w-1/2 shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none dark:bg-gray-800 dark:text-white"
        />

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-xl w-full sm:w-1/4 shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none dark:bg-gray-800 dark:text-white"
        >
          <option value="">Sort By</option>
          <option value="quantity">📦 Quantity (High → Low)</option>
          <option value="pickupTime">⏰ Pickup Time (Soonest First)</option>
        </select>
      </div>

      {/* Donation grid */}
      {sortedDonations.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No donations found 🚫
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {sortedDonations.map((donation) => (
            <div
              key={donation._id}
              className="group bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl hover:border-green-300 transition duration-300 flex flex-col"
            >
              <img
                src={donation.image}
                alt={donation.title}
                className="h-44 w-full object-cover rounded-xl mb-4 group-hover:scale-[1.02] transition-transform duration-300"
              />
              <h3 className="text-xl font-bold text-green-700 dark:text-green-200 mb-2">
                {donation.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-300 mb-1 text-sm">
                🍽️ <strong>Restaurant:</strong> {donation.restaurantName} (
                {donation.location})
              </p>

              <p className="text-gray-600 dark:text-gray-300 mb-1 text-sm">
                📦 <strong>Quantity:</strong> {donation.quantity}
              </p>

              <p className="text-gray-600 dark:text-gray-300 mb-2 text-sm">
                ⏰ <strong>Pickup Time:</strong> {donation.pickupTime}
              </p>

              <span
                className={`inline-block text-xs font-semibold mt-auto px-3 py-1 rounded-full ${getStatusBadge(
                  donation.status
                )}`}
              >
                {donation.status.toLowerCase() === "verified"
                  ? "available"
                  : donation.status}
              </span>

              <Link
                to={`/donationDetails/${donation._id}`}
                className="block text-center bg-green-600 text-white font-medium py-2 px-4 rounded-xl mt-3 hover:bg-green-700 transition duration-200"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllDonation;
