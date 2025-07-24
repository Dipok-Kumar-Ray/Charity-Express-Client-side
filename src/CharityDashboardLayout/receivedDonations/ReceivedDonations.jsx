import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ReceivedDonations = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [donations, setDonations] = useState([]);
  const [selectedDonation, setSelectedDonation] = useState(null);

  // Fetch received donations
  useEffect(() => {
    axiosSecure
      .get(`/charity/received?email=${user.email}`)
      .then((res) => setDonations(res.data));
  }, [user.email, axiosSecure]);

  // Handle Review Submit
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const rating = form.rating.value;
    const comment = form.comment.value;

    const reviewData = {
      restaurantId: selectedDonation.restaurantId,
      restaurantName: selectedDonation.restaurantName,
      charityEmail: user.email,
      rating,
      comment,
    };

    axiosSecure.post("/reviews", reviewData).then(() => {
      Swal.fire("Success", "Review added successfully", "success");
      setSelectedDonation(null);
    });
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Received Donations</h2>
      <div className="grid gap-4">
        {donations.map((donation) => (
          <div
            key={donation._id}
            className="p-4 border rounded shadow bg-white flex justify-between"
          >
            <div>
              <h3 className="font-bold">{donation.donationTitle}</h3>
              <p>Restaurant: {donation.restaurantName}</p>
              <p>Food Type: {donation.foodType}</p>
              <p>Quantity: {donation.quantity}</p>
              <p>
                Pickup Date:{" "}
                {new Date(donation.pickupDate).toLocaleDateString()}
              </p>
            </div>
            <button
              onClick={() => setSelectedDonation(donation)}
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              Review
            </button>
          </div>
        ))}
      </div>

      {/* Review Modal */}
      {selectedDonation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow max-w-sm w-full">
            <h3 className="text-xl font-bold mb-4">
              Review for {selectedDonation.restaurantName}
            </h3>
            <form onSubmit={handleReviewSubmit}>
              <input
                type="number"
                name="rating"
                placeholder="Rating (1-5)"
                min="1"
                max="5"
                className="border p-2 w-full mb-3"
                required
              />
              <textarea
                name="comment"
                placeholder="Write your review"
                className="border p-2 w-full mb-3"
                required
              ></textarea>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedDonation(null)}
                  className="px-3 py-1 border rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReceivedDonations;
