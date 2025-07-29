import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AddDonation = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { register, handleSubmit, reset } = useForm();

 const onSubmit = async (data) => {
  const donationData = {
    title: data.title,
    foodType: data.foodType,
    quantity: data.quantity,
    pickupTime: data.pickupTime,
    location: data.location,
    image: data.image,
    restaurantName: user?.displayName || "",
    restaurantEmail: user?.email || "",
  };

  try {
    const res = await axiosSecure.post("/donations", donationData);
    if (res.data.insertedId) {
      Swal.fire("Success!", "Donation added successfully", "success");
      reset();
    }
  } catch (error) {
    Swal.fire("Error!", "Something went wrong", "error");
  }
};

  return (
    <div className="max-w-lg mx-auto  p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Add Donation</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <div>
          <label className="block font-medium mb-1">Donation Title</label>
          <input
            type="text"
            {...register("title", { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Food Type</label>
          <input
            type="text"
            {...register("foodType", { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Quantity</label>
          <input
            type="text"
            {...register("quantity", { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Pickup Time</label>
          <input
            type="text"
            {...register("pickupTime", { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Location</label>
          <input
            type="text"
            {...register("location", { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Image URL</label>
          <input
            type="text"
            {...register("image", { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Restaurant Name</label>
         <input
  type="text"
  value={user?.displayName || ""}
  readOnly
  className="input input-bordered w-full "
/>
        </div>

        <div>
          <label className="block font-medium mb-1">Restaurant Email</label>
          <input
  type="email"
  value={user?.email || ""}
  readOnly
  className="input input-bordered w-full "
/>
        </div>

        <button type="submit" className="btn btn-success w-full">
          Add Donation
        </button>
      </form>
    </div>
  );
};

export default AddDonation;
