import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageRoleRequests = () => {
  const axiosSecure = useAxiosSecure();
  const [requests, setRequests] = useState([]);

  // Fetch all requests
  const fetchRequests = () => {
    axiosSecure.get("/admin/role-requests").then((res) => setRequests(res.data));
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // Approve Request
  const handleApprove = (id) => {
    Swal.fire({
      title: "Approve this role request?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Approve",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/admin/role-requests/approve/${id}`).then(() => {
          Swal.fire("Approved!", "User is now Charity role.", "success");
          fetchRequests();
        });
      }
    });
  };

  // Reject Request
  const handleReject = (id) => {
    Swal.fire({
      title: "Reject this role request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Reject",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/admin/role-requests/reject/${id}`).then(() => {
          Swal.fire("Rejected!", "Request has been rejected.", "success");
          fetchRequests();
        });
      }
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Role Requests</h2>
      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Organization</th>
              <th>Mission</th>
              <th>Transaction ID</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req._id}>
                <td>{req.name}</td>
                <td>{req.email}</td>
                <td>{req.organization}</td>
                <td>{req.mission}</td>
                <td>{req.transactionId}</td>
                <td>${req.amount}</td>
                <td>
                  {req.status === "Pending" && (
                    <span className="text-yellow-600 font-semibold">Pending</span>
                  )}
                  {req.status === "Approved" && (
                    <span className="text-green-600 font-semibold">Approved</span>
                  )}
                  {req.status === "Rejected" && (
                    <span className="text-red-600 font-semibold">Rejected</span>
                  )}
                </td>
                <td>
                  {req.status === "Pending" ? (
                    <>
                      <button
                        onClick={() => handleApprove(req._id)}
                        className="btn btn-xs btn-success mr-2"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(req._id)}
                        className="btn btn-xs btn-error"
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <span className="text-gray-500">No actions</span>
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

export default ManageRoleRequests;
