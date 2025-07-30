import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ManageRequests = () => {
  const axiosSecure = useAxiosSecure();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axiosSecure.get("/requests");
        setRequests(res.data);
      } catch (err) {
        Swal.fire("Error", "Failed to load requests", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, [axiosSecure]);

  // Delete Request
  const handleDelete = async (id) => {
    const confirmed = await Swal.fire({
      title: "Are you sure?",
      text: "This will delete the request permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
    });

    if (confirmed.isConfirmed) {
      try {
        await axiosSecure.delete(`/requests/${id}`);
        setRequests((prev) => prev.filter((req) => req._id !== id));
        Swal.fire("Deleted!", "Request deleted successfully.", "success");
      } catch (err) {
        Swal.fire("Error", "Failed to delete request", err);
      }
    }
  };

  // Accept Request → Status update
  const handleAccept = async (id) => {
    const confirmed = await Swal.fire({
      title: "Accept this request?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, accept",
    });

    if (confirmed.isConfirmed) {
      try {
        await axiosSecure.patch(`/requests/${id}`, { status: "Confirmed Pickup" });

        // Local state update
        setRequests((prev) =>
          prev.map((req) =>
            req._id === id ? { ...req, status: "Confirmed Pickup" } : req
          )
        );

        Swal.fire("Accepted!", "Request confirmed for pickup.", "success");
      } catch (err) {
        Swal.fire("Error", "Failed to confirm request", err);
      }
    }
  };

  if (loading) return <p className="text-center p-6">Loading requests...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Requests</h2>
      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead className="bg-gray-200 text-blue-600">
            <tr>
              <th>Donation Title</th>
              <th>Charity Name</th>
              <th>Charity Email</th>
              <th>Description</th>
              <th>Pickup Time</th>
              <th>Status</th>
              <th>Requested At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center py-4">
                  No requests found.
                </td>
              </tr>
            )}

            {requests.map((req) => (
              <tr key={req._id}>
                <td>{req.donationTitle}</td>
                <td>{req.charityName}</td>
                <td>{req.charityEmail}</td>
                <td>{req.requestDescription}</td>
                <td>{new Date(req.pickupTime).toLocaleString()}</td>
                <td>{req.status}</td>
                <td>{new Date(req.requestedAt).toLocaleString()}</td>
                <td className="space-x-2">
                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(req._id)}
                    disabled={req.status === "Confirmed Pickup"}
                    className={`px-3 py-1 rounded text-white ${
                      req.status === "Confirmed Pickup"
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-red-600 hover:bg-red-700"
                    }`}
                  >
                    Delete
                  </button>

                  {/* Accept Button শুধুমাত্র Pending হলে */}
                  {req.status === "Pending" && (
                    <button
                      onClick={() => handleAccept(req._id)}
                      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Accept
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageRequests;
