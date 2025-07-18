import { useParams } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ReviewSection from "../Reviews/ReviewSection";
import RequestModal from "../Reviews/RequestModal";
import ReviewModal from "../Reviews/ReviewModal";

const statusColors = {
  Available: "bg-green-100 text-green-800",
  Accepted: "bg-yellow-100 text-yellow-800",
  PickedUp: "bg-gray-100 text-gray-600",
  Cancelled: "bg-red-100 text-red-800",
};

const DonationDetails = () => {
  const { id } = useParams(); // get ID from URL
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [donation, setDonation] = useState(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);

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

  if (!donation)
    return (
      <div className="flex justify-center items-center h-64 text-gray-500 text-lg">
        Loading donation details...
      </div>
    );

  const handleSaveFavorite = async () => {
    const favoriteData = {
      donationId: donation._id,
      userEmail: user?.email,
      donationTitle: donation.title,
    };
    try {
      const res = await axiosSecure.post("/favorites", favoriteData);
      if (res.data.insertedId) {
        Swal.fire("Success", "Donation saved to favorites", "success");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", error.message, "error");
    }
  };

  const handleConfirmPickup = async () => {
    try {
      await axiosSecure.patch(`/donations/${donation._id}/pickup`);
      Swal.fire("Success", "Donation marked as Picked Up", "success");
    } catch (err) {
      Swal.fire("Error", "Failed to update pickup status", err.message);
    }
  };

  return (
    <div className=" max-w-3xl mx-auto p-8  rounded-lg shadow-lg border">
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
                  statusColors[donation.status] || " text-gray-800"
                }`}
              >
                {donation.status}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-6">
            <button
              onClick={handleSaveFavorite}
              className="flex-1 md:flex-none px-5 py-2 bg-green-600  font-medium rounded-md hover:bg-green-700 transition"
              aria-label="Save to Favorites"
            >
              Save to Favorites
            </button>

            {user?.role === "charity" && donation.status === "Available" && (
              <button
                onClick={() => setShowRequestModal(true)}
                className="flex-1 md:flex-none px-5 py-2 bg-indigo-600  font-medium rounded-md hover:bg-indigo-700 transition"
                aria-label="Request Donation"
              >
                Request Donation
              </button>
            )}

            {user?.role === "charity" && donation.status === "Accepted" && (
              <button
                onClick={handleConfirmPickup}
                className="flex-1 md:flex-none px-5 py-2 bg-yellow-500  font-medium rounded-md hover:bg-yellow-600 transition"
                aria-label="Confirm Pickup"
              >
                Confirm Pickup
              </button>
            )}

            <button
              onClick={() => setShowReviewModal(true)}
              className="flex-1 md:flex-none px-5 py-2 bg-purple-600  font-medium rounded-md hover:bg-purple-700 transition"
              aria-label="Add Review"
            >
              Add Review
            </button>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <ReviewSection donationId={donation._id} />
      </div>

      {/* Modals */}
      {showRequestModal && (
        <RequestModal
          donation={donation}
          user={user}
          onClose={() => setShowRequestModal(false)}
        />
      )}
      {showReviewModal && (
        <ReviewModal
          donationId={donation._id}
          user={user}
          onClose={() => setShowReviewModal(false)}
        />
      )}
    </div>
  );
};

export default DonationDetails;
