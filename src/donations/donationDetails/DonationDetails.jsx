import { useParams } from "react-router";
import { useEffect, useState, useCallback } from "react";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import RequestModal from "../Reviews/RequestModal";
import ReviewModal from "../Reviews/ReviewModal";

const statusColors = {
  available: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  verified: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  accepted: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  requested: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300",
  pickedup: "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300",
  cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
};

const DonationDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [donation, setDonation] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [role, setRole] = useState();
  const [loadingRole, setLoadingRole] = useState(true);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);

  // Fetch user role
  useEffect(() => {
    const fetchRole = async () => {
      if (user?.email) {
        try {
          const res = await axiosSecure.get(`/users/${user.email}`);
          setRole(res.data.role?.toLowerCase() || "");
        } catch {
          setRole("");
        } finally {
          setLoadingRole(false);
        }
      } else {
        setRole("");
        setLoadingRole(false);
      }
    };
    fetchRole();
  }, [user?.email, axiosSecure]);

  // Fetch donation details
  const fetchDonation = useCallback(async () => {
    try {
      const res = await axiosSecure.get(`/donations/${id}`);
      setDonation(res.data);
    } catch (error) {
      console.error("Error fetching donation details", error);
    }
  }, [id, axiosSecure]);

  useEffect(() => {
    fetchDonation();
  }, [fetchDonation]);

  // Fetch reviews
  const fetchReviews = useCallback(async () => {
    try {
      const res = await axiosSecure.get(`/reviews?donationId=${id}`);
      setReviews(res.data);
    } catch (error) {
      console.error("Error fetching reviews", error);
    }
  }, [id, axiosSecure]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  if (!donation || loadingRole) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-gray-500 dark:text-gray-400 text-lg">
        Loading donation details...
      </div>
    );
  }

  const status = donation.status?.toLowerCase() || "";

  // Save to favorites
  const handleSaveFavorite = async () => {
    if (!user?.email) {
      Swal.fire("Error", "Please login to save favorites", "error");
      return;
    }
    const favoriteData = {
      donationId: donation._id,
      userEmail: user.email,
      title: donation.title,
      image: donation.image,
      restaurantName: donation.restaurantName,
      location: donation.location,
      status: donation.status,
      quantity: donation.quantity,
    };

    try {
      const res = await axiosSecure.post("/favorites", favoriteData);
      if (res.data.insertedId) {
        Swal.fire("Success", "Donation saved to favorites", "success");
      }
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || error.message, "error");
    }
  };

  // Confirm pickup
  const handleConfirmPickup = async () => {
    try {
      await axiosSecure.patch(`/requests/${donation._id}/status`, {
        status: "pickedup",
      });
      Swal.fire("Success", "Donation marked as Picked Up", "success");
      setDonation({ ...donation, status: "pickedup" });
    } catch {
      Swal.fire("Error", "Failed to update pickup status", "error");
    }
  };

  return (
    <div className="mt-16 min-h-screen bg-gradient-to-tr from-green-50 to-white dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
        {/* Title */}
        <div className="px-6 py-8 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-3xl font-extrabold text-center text-green-700 dark:text-green-300">
            {donation.title}
          </h2>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col lg:flex-row gap-8">
          {/* Image */}
          <div className="lg:w-1/2">
            <img
              src={donation.image}
              alt={donation.title}
              className="w-full h-80 object-cover rounded-xl shadow-md"
              loading="lazy"
            />
          </div>

          {/* Details */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                {donation.description}
              </p>

              <div className="space-y-2">
                <p className="text-gray-600 dark:text-gray-400">
                  <span className="font-semibold">Restaurant: </span>
                  {donation.restaurantName}, {donation.location}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  <span className="font-semibold">Pickup Window: </span>
                  {donation.pickupTime}
                </p>
                <span
                  className={`inline-block px-3 py-1 rounded-full font-semibold text-sm capitalize ${
                    statusColors[status] || "text-gray-800 dark:text-gray-300"
                  }`}
                >
                  {donation.status.toLowerCase() === "verified"
                    ? "available"
                    : donation.status}
                </span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3 mt-8">
              {user && (
                <button
                  onClick={handleSaveFavorite}
                  className="flex-1 md:flex-none px-5 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition"
                >
                  Save to Favorites
                </button>
              )}

              {role === "charity" &&
                (status === "available" || status === "verified") && (
                  <button
                    onClick={() => setShowRequestModal(true)}
                    className="flex-1 md:flex-none px-5 py-2 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition"
                  >
                    Request Donation
                  </button>
                )}

              {role === "charity" && status === "accepted" && (
                <button
                  onClick={handleConfirmPickup}
                  className="flex-1 md:flex-none px-5 py-2 bg-yellow-500 text-white font-medium rounded-lg hover:bg-yellow-600 transition"
                >
                  Confirm Pickup
                </button>
              )}

              {user && (
                <button
                  onClick={() => setShowReviewModal(true)}
                  className="flex-1 md:flex-none px-5 py-2 bg-green-700 text-white font-medium rounded-lg hover:bg-green-800 transition"
                >
                  Add Review
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Reviews */}
        {reviews.length > 0 && (
          <div className="px-6 py-8 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
              User Reviews
            </h3>
            <div className="space-y-4">
              {reviews.map((item, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-4 shadow-sm hover:shadow-md transition bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold text-lg text-gray-800 dark:text-gray-200">
                      {item.userName}
                    </h4>
                    <span className="text-yellow-500 font-bold">
                      ⭐ {item.rating}/5
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-1">
                    {item.comment}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(item.createdAt || item.reviewDate).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Request Modal */}
      {showRequestModal && (
        <RequestModal
          donation={donation}
          user={user}
          onClose={() => setShowRequestModal(false)}
          onSuccess={() => {
            setShowRequestModal(false);
            setDonation({ ...donation, status: "accepted" });
            Swal.fire("Requested!", "Donation request sent successfully", "success");
          }}
        />
      )}

      {/* Review Modal */}
      {showReviewModal && (
        <ReviewModal
          donationId={donation._id}
          user={user}
          onClose={() => {
            setShowReviewModal(false);
            fetchReviews();
          }}
        />
      )}
    </div>
  );
};

export default DonationDetails;
