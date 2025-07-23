import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router";

const MyDonations = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    axiosSecure.get(`/donations?email=${user.email}`).then((res) => {
      setDonations(res.data);
    });
  }, [axiosSecure, user]);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      await axiosSecure.delete(`/donations/${id}`);
      setDonations(donations.filter((item) => item._id !== id));
      Swal.fire("Deleted!", "Donation has been deleted.", "success");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Donations</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {donations.map((donation) => (
          <div key={donation._id} className=" p-4 rounded shadow">
            <img src={donation.image} alt={donation.title} className="w-full h-40 object-cover rounded" />
            <h3 className="text-xl font-semibold mt-2">{donation.title}</h3>
            <p>Type: {donation.foodType}</p>
            <p>Quantity: {donation.quantity}</p>
            <p>Status: <span className="font-semibold">{donation.status}</span></p>

            <div className="mt-3 space-x-2">
              {donation.status !== "Rejected" && (
                <Link to={`/update-donation/${donation._id}`} className="btn btn-sm btn-warning">
                  Update
                </Link>
              )}
              <button onClick={() => handleDelete(donation._id)} className="btn btn-sm btn-error">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyDonations;
