import axios from "axios";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const AddDonation = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:3000/donations", data);
      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Donation Added!",
          text: "Your donation has been successfully submitted.",
          confirmButtonColor: "#16a34a",
        });
        reset();
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: "Could not add donation. Try again.",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
        text: error.message || "Network error",
      });
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 rounded-xl shadow-md mt-6">
      <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
        Add Donation
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Donation Title */}
        <div>
          <label className="block font-medium mb-1">Donation Title</label>
          <input
            {...register("title", { required: "Title is required" })}
            placeholder="e.g. Surplus Pastries"
            className="w-full border p-2 rounded"
          />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
        </div>

        {/* Food Type */}
        <div>
          <label className="block font-medium mb-1">Food Type</label>
          <select
            {...register("foodType", { required: "Please select food type" })}
            className="w-full border p-2 rounded bg-amber-500"
          >
            <option value="Vegetables">Vegetables</option>
            <option value="Fruits">Fruits</option>
            <option value="Cooked Food">Cooked Food</option>
            <option value="Bakery">Bakery</option>
            <option value="Others">Others</option>
          </select>
          {errors.foodType && (
            <p className="text-red-500">{errors.foodType.message}</p>
          )}
        </div>

        {/* Quantity */}
        <div>
          <label className="block font-medium mb-1">
            Quantity (kg or portions)
          </label>
          <input
            {...register("quantity", { required: "Quantity is required" })}
            placeholder="e.g. 10"
            className="w-full border p-2 rounded"
          />
          {errors.quantity && (
            <p className="text-red-500">{errors.quantity.message}</p>
          )}
        </div>

        {/* Pickup Time Window */}
        <div>
          <label className="block font-medium mb-1">Pickup Time Window</label>
          <input
            {...register("pickupTime", { required: "Pickup time is required" })}
            placeholder="e.g. 4:00 PM - 6:00 PM"
            className="w-full border p-2 rounded"
          />
          {errors.pickupTime && (
            <p className="text-red-500">{errors.pickupTime.message}</p>
          )}
        </div>

        {/* Location */}
        <div>
          <label className="block font-medium mb-1">Location</label>
          <input
            {...register("location", { required: "Location is required" })}
            placeholder="e.g. 123 Main St, City"
            className="w-full border p-2 rounded"
          />
          {errors.location && (
            <p className="text-red-500">{errors.location.message}</p>
          )}
        </div>

        {/* Image File */}
        <div>
          <label className="block font-medium mb-1">Image</label>
          <input type="text" {...register("image")} className="w-full" />
        </div>

        {/* Status Field */}
        <div>
          <label className="block font-medium mb-1">Status</label>
          <select
            {...register("status", { required: "Status is required" })}
            className="w-full border p-2 rounded"
          >
            <option value="">Select status</option>
            <option value="Available">Available</option>
            <option value="Picked Up">Picked Up</option>
            <option value="Expired">Expired</option>
          </select>
          {errors.status && (
            <p className="text-red-500">{errors.status.message}</p>
          )}
        </div>

        {/* Restaurant Name & Email */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Restaurant Name</label>
            <input
              {...register("restaurantName", {
                required: "Restaurant name is required",
              })}
              defaultValue="green view restaurant ltd"
              className="w-full border p-2 rounded"
              readOnly
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              {...register("email", { required: "Email is required" })}
              defaultValue="restaurant@gmail.com"
              className="w-full border p-2 rounded"
              readOnly
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Add Donation
        </button>
      </form>
    </div>
  );
};

export default AddDonation;
