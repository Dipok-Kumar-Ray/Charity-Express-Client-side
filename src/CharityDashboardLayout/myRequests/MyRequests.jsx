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

    axiosSecure.get(`/requests?email=${user.email}`).then((res) => {
      setRequests(res.data);
    });
  }, [user.email, axiosSecure]);

  // Delete button handler
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/requests/${id}`).then(() => {
          setRequests((prev) => prev.filter((req) => req._id !== id));
          Swal.fire("Deleted!", "Your request has been deleted.", "success");
        });
      }
    });
  };

  // Accept button handler
  const handleAccept = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to accept this confirmed pickup?",
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Yes, accept it!",
    }).then((result) => {
      if (result.isConfirmed) {
        
        axiosSecure.patch(`/requests/${id}`, { status: "Accepted" }).then(() => {
          setRequests((prev) =>
            prev.map((req) =>
              req._id === id ? { ...req, status: "Accepted" } : req
            )
          );
          Swal.fire("Accepted!", "Pickup has been accepted.", "success");
        });
      }
    });
  };

  if (requests.length === 0)
    return <p className="text-gray-500">No requests found.</p>;

  return (
    <div className="overflow-x-auto">
      <h2 className="text-3xl my-7 font-bold text-center text-green-500">My Requests</h2>
      <table className="min-w-full border border-gray-300 divide-y divide-gray-200">
        <thead className="bg-green-300">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border">
              Donation Title
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border">
              Charity Name
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border">
              Charity Email
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border">
              Request Description
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border">
              Pickup Time
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border">
              Status
            </th>
            <th className="px-4 py-2 text-center text-sm font-medium text-gray-700 border">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {requests.map((req) => (
            <tr key={req._id} className="text-sm text-gray-700">
              <td className="px-4 py-2 border">{req.donationTitle || "No Title"}</td>
              <td className="px-4 py-2 border">{req.charityName || "N/A"}</td>
              <td className="px-4 py-2 border">{req.charityEmail || "N/A"}</td>
              <td className="px-4 py-2 border">{req.requestDescription || "N/A"}</td>
              <td className="px-4 py-2 border">
                {new Date(req.pickupTime).toLocaleString() || "N/A"}
              </td>
              <td className="px-4 py-2 border">{req.status}</td>
              <td className="px-4 py-2 border text-center space-x-2">
                {req.status === "Pending" && (
                  <button
                    onClick={() => handleDelete(req._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                )}
                {req.status === "Confirmed Pickup" && (
                  <button
                    onClick={() => handleAccept(req._id)}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
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
  );
};

export default MyRequests;
