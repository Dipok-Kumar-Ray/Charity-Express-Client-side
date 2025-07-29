import { useParams } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import RequestModal from "../Reviews/RequestModal";
import ReviewModal from "../Reviews/ReviewModal";

// Status colors with lowercase keys
const statusColors = {
  available: "bg-green-100 text-green-800",
  accepted: "bg-yellow-100 text-yellow-800",
  pickedup: "bg-gray-100 text-gray-600",
  cancelled: "bg-red-100 text-red-800",
};

const DonationDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [donation, setDonation] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);

  // ✅ Role state আনছি backend থেকে
  const [role, setRole] = useState("");

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/users/${user.email}`).then(res => {
        setRole(res.data.role?.toLowerCase());
      });
    }
  }, [user?.email, axiosSecure]);

  // Fetch donation details
  useEffect(() => {
    const fetchDonation = async () => {
      try {
        const res = await axiosSecure.get(`/donations/${id}`);
        setDonation(res.data);
      } catch (error) {
        console.error("Error fetching donation details", error);
      }
    };
    fetchDonation();
  }, [id, axiosSecure]);

  // Fetch reviews
  const fetchReviews = async () => {
    try {
      const res = await axiosSecure.get(`/reviews?donationId=${id}`);
      setReviews(res.data);
    } catch (error) {
      console.error("Error fetching reviews", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [id]);

  if (!donation)
    return (
      <div className="flex justify-center items-center h-64 text-gray-500 text-lg">
        Loading donation details...
      </div>
    );

  // Status কে lowercase করছি
  const status = donation.status?.toLowerCase();

  // Save to favorites
  const handleSaveFavorite = async () => {
    const favoriteData = {
      donationId: donation._id,
      userEmail: user?.email,
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
      Swal.fire("Error", error.message, "error");
    }
  };
  console.log(role, status);

  // Confirm pickup
  const handleConfirmPickup = async () => {
    try {
      await axiosSecure.patch(`/donations/${donation._id}/pickup`);
      Swal.fire("Success", "Donation marked as Picked Up", "success");
      setDonation({ ...donation, status: "PickedUp" });
    } catch (err) {
      Swal.fire("Error", "Failed to update pickup status", err.message);
    }
  };

  return (
    <div className="mt-8 max-w-3xl mx-auto p-8 rounded-lg shadow-lg border">
      <h2 className="text-4xl font-extrabold mb-6 text-gray-900">
        {donation.title}
      </h2>

      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={donation.image}
          alt={donation.title}
          className="w-full md:w-1/2 rounded-lg shadow-md object-cover"
          loading="lazy"
        />

        <div className="flex-1 flex flex-col justify-between">
          <div>
            <p className="text-gray-700 mb-4 leading-relaxed">
              {donation.description}
            </p>

            <div className="mb-4 space-y-2">
              <p className="text-gray-600">
                <span className="font-semibold">Restaurant: </span>
                {donation.restaurantName}, {donation.location}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Pickup Window: </span>
                {donation.pickupTime}
              </p>
              <p
                className={`inline-block px-3 py-1 rounded-full font-semibold text-sm ${
                  statusColors[status] || "text-gray-800"
                }`}
              >
                {donation.status}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-6">
            {/* Save favorite always visible */}
            <button
              onClick={handleSaveFavorite}
              className="flex-1 md:flex-none px-5 py-2 bg-green-600 font-medium rounded-md hover:bg-green-700 transition"
            >
              Save to Favorites
            </button>

            {/* Request button only for charity + available */}
            {role === "charity" && status === "available" && (
              <button
                onClick={() => setShowRequestModal(true)}
                className="flex-1 md:flex-none px-5 py-2 bg-indigo-600 font-medium rounded-md hover:bg-indigo-700 transition"
              >
                Request Donation
              </button>
            )}

            {/* Confirm Pickup button only for charity + accepted */}
            {role === "charity" && status === "accepted" && (
              <button
                onClick={handleConfirmPickup}
                className="flex-1 md:flex-none px-5 py-2 bg-yellow-500 font-medium rounded-md hover:bg-yellow-600 transition"
              >
                Confirm Pickup
              </button>
            )}

            {/* Add Review always visible */}
            <button
              onClick={() => setShowReviewModal(true)}
              className="flex-1 md:flex-none px-5 py-2 bg-purple-600 font-medium rounded-md hover:bg-purple-700 transition"
            >
              Add Review
            </button>
          </div>
        </div>
      </div>

      {/* Review Section */}
      {reviews.length > 0 && (
        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-4 border-b pb-2">User Reviews</h3>
          <div className="space-y-4">
            {reviews.map((item, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 shadow-sm hover:shadow transition"
              >
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-semibold text-lg">{item.userName}</h4>
                  <span className="text-yellow-500 font-bold">
                    ⭐ {item.rating}/5
                  </span>
                </div>
                <p className="text-gray-700 mb-1">{item.comment}</p>
                <p className="text-sm text-gray-500">
                  {new Date(item.reviewDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modals */}
      {showRequestModal && (
        <RequestModal
          donation={donation}
          user={user}
          onClose={() => setShowRequestModal(false)}
          onSuccess={() => {
            setShowRequestModal(false);
            Swal.fire(
              "Requested!",
              "Donation request sent successfully",
              "success"
            );
          }}
        />
      )}
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
