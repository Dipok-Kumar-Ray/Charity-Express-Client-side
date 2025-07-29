import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const FeatureDonations = () => {
  const axiosSecure = useAxiosSecure();
  const [donations, setDonations] = useState([]);

  // Fetch verified donations
  const fetchDonations = () => {
    axiosSecure.get("/admin/verified-donations").then((res) => setDonations(res.data));
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  // Feature Donation
  const handleFeature = (donationId) => {
    Swal.fire({
      title: "Feature this donation?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Feature it",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .post("/admin/feature-donation", { donationId })
          .then(() => {
            Swal.fire("Featured!", "Donation has been featured.", "success");
            fetchDonations();
          })
          .catch((err) => {
            Swal.fire("Error!", err.response.data.message, "error");
          });
      }
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Feature Donations</h2>
      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Food Type</th>
              <th>Restaurant</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation) => (
              <tr key={donation._id}>
                <td>
                  <img
                    src={donation.image}
                    alt={donation.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td>{donation.title}</td>
                <td>{donation.foodType}</td>
                <td>{donation.restaurantName}</td>
                <td>
                  <button
                    onClick={() => handleFeature(donation._id)}
                    className="btn btn-xs btn-primary"
                  >
                    Feature
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeatureDonations;
