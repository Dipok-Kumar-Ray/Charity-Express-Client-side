import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const MyPickups = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [pickups, setPickups] = useState([]);

  // Fetch Accepted Pickups
  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/charity/pickups?email=${user.email}`)
        .then((res) => setPickups(res.data))
        .catch((err) => console.error("Error fetching pickups:", err));
    }
  }, [user?.email, axiosSecure]);

  // Confirm Pickup
  const handleConfirmPickup = (id) => {
    Swal.fire({
      title: "Confirm Pickup?",
      text: "This donation will be marked as Picked Up.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.put(`/charity/pickups/${id}`).then(() => {
          setPickups(pickups.filter((p) => p._id !== id));
          Swal.fire("Confirmed!", "Pickup confirmed successfully.", "success");
        });
      }
    });
  };

  return (
    <div className="grid gap-4">
      {/* No Data Fallback */}
      {pickups.length === 0 && (
        <p className="text-center text-gray-500">No pickups found</p>
      )}

      {/* Show Pickups */}
      {pickups.map((pickup) => (
        <div key={pickup._id} className="p-4 border rounded shadow bg-white">
          <h3 className="font-bold">{pickup.donationTitle}</h3>
          <p>Restaurant: {pickup.restaurantName}</p>
          <p>Location: {pickup.location}</p>
          <p>Food Type: {pickup.foodType}</p>
          <p>Quantity: {pickup.quantity}</p>
          <p>Status: {pickup.status}</p>
          <button
            onClick={() => handleConfirmPickup(pickup._id)}
            className="bg-green-500 text-white px-3 py-1 rounded mt-2"
          >
            Confirm Pickup
          </button>
        </div>
      ))}
    </div>
  );
};

export default MyPickups;
