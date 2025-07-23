// import { Link } from "react-router";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const MyDonations = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [donations, setDonations] = useState([]);
  const [selectedDonation, setSelectedDonation] = useState(null);

  // Fetch donations
  useEffect(() => {
    axiosSecure.get(`/donations?email=${user.email}`).then((res) => {
      setDonations(res.data);
    });
  }, [axiosSecure, user]);

  // Delete donation
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

  // Update donation submit
  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedData = {
      title: form.title.value,
      foodType: form.foodType.value,
      quantity: form.quantity.value,
      pickupTime: form.pickupTime.value,
      location: form.location.value,
      image: form.image.value,
    };

    try {
      const res = await axiosSecure.patch(`/donations/${selectedDonation._id}`, updatedData);
      if (res.data.modifiedCount > 0) {
        Swal.fire("Updated!", "Donation updated successfully", "success");

        // Update UI without refetch
        const updatedDonations = donations.map((donation) =>
          donation._id === selectedDonation._id
            ? { ...donation, ...updatedData }
            : donation
        );
        setDonations(updatedDonations);

        setSelectedDonation(null); // close modal
      }
    } catch (error) {
      Swal.fire("Error!", "Something went wrong", error);
    }
  };

  return (
    <div>
      <h2 className="text-center text-3xl font-bold mb-4">My Donations</h2>
      <div className="grid md:grid-cols-2 gap-6 bg-green-400">
        {donations.map((donation) => (
          <div key={donation._id} className="p-4 rounded shadow">
            <img
              src={donation.image}
              alt={donation.title}
              className="w-full h-40 object-cover rounded"
            />
            <h3 className="text-xl font-semibold mt-2">{donation.title}</h3>
            <p>Type: {donation.foodType}</p>
            <p>Quantity: {donation.quantity}</p>
            <p>
              Status: <span className="font-semibold">{donation.status}</span>
            </p>

            <div className="mt-3 space-x-2">
              {donation.status !== "Rejected" && (
                <button
                  onClick={() => setSelectedDonation(donation)}
                  className="btn btn-sm btn-warning"
                >
                  Update
                </button>
              )}
              <button
                onClick={() => handleDelete(donation._id)}
                className="btn btn-sm btn-error"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Update Modal */}
      {selectedDonation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className=" p-6 rounded shadow max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Update Donation</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <input
                type="text"
                name="title"
                defaultValue={selectedDonation.title}
                className="input input-bordered w-full"
                placeholder="Donation Title"
              />
              <input
                type="text"
                name="foodType"
                defaultValue={selectedDonation.foodType}
                className="input input-bordered w-full"
                placeholder="Food Type"
              />
              <input
                type="text"
                name="quantity"
                defaultValue={selectedDonation.quantity}
                className="input input-bordered w-full"
                placeholder="Quantity"
              />
              <input
                type="text"
                name="pickupTime"
                defaultValue={selectedDonation.pickupTime}
                className="input input-bordered w-full"
                placeholder="Pickup Time"
              />
              <input
                type="text"
                name="location"
                defaultValue={selectedDonation.location}
                className="input input-bordered w-full"
                placeholder="Location"
              />
              <input
                type="text"
                name="image"
                defaultValue={selectedDonation.image}
                className="input input-bordered w-full"
                placeholder="Image URL"
              />

              <div className="flex justify-between mt-4">
                <button type="submit" className="btn btn-success">
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedDonation(null)}
                  className="btn btn-ghost"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyDonations;
