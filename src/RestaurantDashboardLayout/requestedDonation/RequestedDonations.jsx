import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const RequestedDonations = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axiosSecure.get(`/requests?email=${user.email}`).then((res) => {
      setRequests(res.data);
    });
  }, [axiosSecure, user]);

  const handleAction = async (id, donationId, action) => {
    const res = await axiosSecure.patch(`/requests/${id}`, { action, donationId });
    if (res.data.modifiedCount > 0) {
      Swal.fire("Updated!", `Request ${action}ed successfully`, "success");
      const updated = requests.map((req) =>
        req._id === id ? { ...req, status: action } : req
      );
      setRequests(updated);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Requested Donations</h2>
      <div className="overflow-x-auto">
        <table className="table w-full  shadow rounded">
          <thead>
            <tr>
              <th>Donation</th>
              <th>Type</th>
              <th>Charity Name</th>
              <th>Email</th>
              <th>Pickup Time</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req._id}>
                <td>{req.donationTitle}</td>
                <td>{req.foodType}</td>
                <td>{req.charityName}</td>
                <td>{req.charityEmail}</td>
                <td>{req.pickupTime}</td>
                <td>{req.status}</td>
                <td className="space-x-2">
                  {req.status === "Pending" && (
                    <>
                      <button
                        onClick={() => handleAction(req._id, req.donationId, "Accepted")}
                        className="btn btn-xs btn-success"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleAction(req._id, req.donationId, "Rejected")}
                        className="btn btn-xs btn-error"
                      >
                        Reject
                      </button>
                    </>
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

export default RequestedDonations;
