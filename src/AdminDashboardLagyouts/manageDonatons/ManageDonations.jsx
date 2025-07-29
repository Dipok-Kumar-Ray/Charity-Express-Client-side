import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageDonations = () => {
  const axiosSecure = useAxiosSecure();
  const [donations, setDonations] = useState([]);

  // Fetch Donations
  const fetchDonations = () => {
    axiosSecure.get("/admin/donations").then((res) => setDonations(res.data));
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  // Verify Donation
  const handleVerify = (id) => {
    Swal.fire({
      title: "Verify this donation?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Verify",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/admin/donations/verify/${id}`).then(() => {
          Swal.fire("Verified!", "Donation has been verified.", "success");
          fetchDonations();
        });
      }
    });
  };

  // Reject Donation
  const handleReject = (id) => {
    Swal.fire({
      title: "Reject this donation?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Reject",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/admin/donations/reject/${id}`).then(() => {
          Swal.fire("Rejected!", "Donation has been rejected.", "success");
          fetchDonations();
        });
      }
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Donations</h2>
      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead>
            <tr>
              <th>Title</th>
              <th>Food Type</th>
              <th>Restaurant Name</th>
              <th>Email</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation) => (
              <tr key={donation._id}>
                <td>{donation.title}</td>
                <td>{donation.foodType}</td>
                <td>{donation.restaurantName}</td>
                <td>{donation.restaurantEmail}</td>
                <td>{donation.quantity}</td>
                <td>
                  {donation.status === "Pending" && (
                    <span className="text-yellow-600 font-semibold">Pending</span>
                  )}
                  {donation.status === "Verified" && (
                    <span className="text-green-600 font-semibold">Verified</span>
                  )}
                  {donation.status === "Rejected" && (
                    <span className="text-red-600 font-semibold">Rejected</span>
                  )}
                </td>
                <td>
                  {donation.status === "Pending" ? (
                    <>
                      <button
                        onClick={() => handleVerify(donation._id)}
                        className="btn btn-xs btn-success mr-2"
                      >
                        Verify
                      </button>
                      <button
                        onClick={() => handleReject(donation._id)}
                        className="btn btn-xs btn-error"
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <span className="text-gray-500">No Actions</span>
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

export default ManageDonations;
