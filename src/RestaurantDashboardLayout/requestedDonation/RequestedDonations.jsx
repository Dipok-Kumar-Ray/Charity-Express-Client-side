import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const RequestedDonations = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/requests?email=${user.email}`).then((res) => {
        setRequests(res.data);
      });
    }
  }, [axiosSecure, user]);

  const handleStatusChange = async (id, donationId, status) => {
    await axiosSecure.patch(`/requests/${id}`, { status, donationId });
    Swal.fire("Success!", `Request ${status}`, "success");

    const updatedRequests = requests.map((req) =>
      req._id === id ? { ...req, status } : req
    );

    if (status === "Accepted") {
      updatedRequests.forEach((req) => {
        if (req.donationId === donationId && req._id !== id) {
          req.status = "Rejected";
        }
      });
    }

    setRequests(updatedRequests);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <p className="text-center">Please login to view your requested donations.</p>;
  }

  return (
    <div>
      <h2 className="text-center text-3xl font-bold mb-4">Requested Donations</h2>
      <div className="overflow-x-auto">
        <table className="table border">
          <thead className="bg-green-400 text-white">
            <tr>
              <th>Donation</th>
              <th>Food Type</th>
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
                <td>
                  {req.status === "Pending" && (
                    <div className="space-x-2">
                      <button
                        onClick={() =>
                          handleStatusChange(req._id, req.donationId, "Accepted")
                        }
                        className="btn btn-success btn-sm my-3"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() =>
                          handleStatusChange(req._id, req.donationId, "Rejected")
                        }
                        className="btn btn-error btn-sm"
                      >
                        Reject
                      </button>
                    </div>
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
