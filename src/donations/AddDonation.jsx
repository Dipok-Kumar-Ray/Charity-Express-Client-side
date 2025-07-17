import axios from "axios";
import { useForm } from "react-hook-form";

const AddDonation = () => {
  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:3000/donations", data);
      if (res.data.insertedId) {
        alert("✅ Donation added successfully!");
        // reset();
      } else {
        alert("❌ Failed to add donation.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=" p-6 rounded-xl shadow-md max-w-xl mx-auto space-y-4"
    >
      <h2 className="text-2xl font-bold text-center text-green-700">
        Add New Donation
      </h2>

      {/* Donation Title */}
      <div>
        <label className="block font-medium mb-1">Donation Title : </label>
        <input
          {...register("title", { required: "Title is required" })}
          className="w-full border  p-2 rounded"
          placeholder="e.g. Fresh Vegetables"
        />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
      </div>

      {/* Description */}
      <div>
        <label className="block font-medium mb-1">Description : </label>
        <textarea
          {...register("description", { required: "Description is required" })}
          className="w-full border p-2 rounded"
          placeholder="Type of food, quantity, pickup instructions"
        />
        {errors.description && (
          <p className="text-red-500">{errors.description.message}</p>
        )}
      </div>

      {/* Restaurant Name & Location */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-medium mb-1">Restaurant Name : </label>
          <input
            {...register("restaurantName", { required: "Required" })}
            className="w-full border  p-2 rounded"
          />
          {errors.restaurantName && (
            <p className="text-red-500">{errors.restaurantName.message}</p>
          )}
        </div>
        <div>
          <label className="block font-medium mb-1">Location : </label>
          <input
            {...register("location", { required: "Required" })}
            className="w-full border p-2 rounded"
          />
          {errors.location && (
            <p className="text-red-500">{errors.location.message}</p>
          )}
        </div>
      </div>

      {/* Pickup Time */}
      <div>
        <label className="block font-medium mb-1">Pickup Time Window : </label>
        <input
          {...register("pickupTime", { required: "Pickup time is required" })}
          className="w-full border  p-2 rounded"
          placeholder="e.g. 6 PM - 9 PM"
        />
        {errors.pickupTime && (
          <p className="text-red-500">{errors.pickupTime.message}</p>
        )}
      </div>

      {/* Status */}
      <div>
        <label className="block font-medium mb-1">Status : </label>
        <select
          {...register("status")}
          className="w-full border p-2 rounded"
        >
          <option value="Available">Available</option>
          <option value="Requested">Requested</option>
          <option value="Picked Up">Picked Up</option>
        </select>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        Submit Donation
      </button>
    </form>
  );
};

export default AddDonation;
