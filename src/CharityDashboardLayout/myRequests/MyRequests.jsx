import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const MyRequests = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    if (!user?.email) return;

    axiosSecure.get(`/charity/requests?email=${user.email}`).then((res) => {
      setRequests(res.data);
    });
  }, [user.email, axiosSecure]);

  const handleCancel = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to cancel this request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/charity/requests/${id}`).then(() => {
          setRequests(requests.filter((req) => req._id !== id));
          Swal.fire("Cancelled!", "Your request has been cancelled.", "success");
        });
      }
    });
  };

  return (
    <div className="grid gap-4">
      {requests.length === 0 && (
        <p className="text-gray-500">No requests found.</p>
      )}

      {requests.map((req) => (
        <div key={req._id} className="p-4 border rounded shadow bg-white">
          <h3 className="font-bold">{req.donationTitle || "No Title"}</h3>
          <p>Restaurant: {req.restaurantName || "N/A"}</p>
          <p>Food Type: {req.foodType || "N/A"}</p>
          <p>Quantity: {req.quantity || "N/A"}</p>
          <p>Status: {req.status}</p>

          {req.status === "Pending" && (
            <button
              onClick={() => handleCancel(req._id)}
              className="bg-red-500 text-white px-3 py-1 rounded mt-2"
            >
              Cancel
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default MyRequests;
