import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const RequestModal = ({ donation, user, onClose, onSuccess }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    const requestData = {
      donationId: donation._id,
      donationTitle: donation.title,
      restaurantId: donation.restaurantId,
      restaurantName: donation.restaurantName,
      charityName: user.displayName || user.name || "Anonymous",
      charityEmail: user.email,
      requestDescription: data.requestDescription,
      pickupTime: data.pickupTime,
      status: "Pending",
      requestedAt: new Date(),
    };

    try {
      await axiosSecure.post("/requests", requestData);
      Swal.fire("Success", "Request submitted successfully", "success");
      reset();
      onClose();
      if (onSuccess) onSuccess();
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || error.message || "Failed to submit request", "error");
    }
  };

  return (
    <div className="fixed inset-0  bg-opacity-40 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-blue-300 text-black p-6 rounded-lg shadow-md max-w-md w-full space-y-4"
      >
        <h2 className="text-2xl font-bold mb-2">Request Donation</h2>

        {/* Donation Title */}
        <div>
          <label className="block text-sm font-medium">Donation Title</label>
          <input
            type="text"
            value={donation.title}
            readOnly
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>

        {/* Restaurant Name */}
        <div>
          <label className="block text-sm font-medium">Restaurant Name</label>
          <input
            type="text"
            value={donation.restaurantName}
            readOnly
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>

        {/* Charity Info */}
        <div>
          <label className="block text-sm font-medium">Charity Name</label>
          <input
            type="text"
            value={user.displayName || user.name || "Anonymous"}
            readOnly
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Charity Email</label>
          <input
            type="email"
            value={user.email}
            readOnly
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>

        {/* Request Description */}
        <div>
          <label className="block text-sm font-medium">Request Description</label>
          <textarea
            {...register("requestDescription", { required: "Description is required" })}
            className="w-full p-2 border rounded"
            placeholder="Why do you need this donation?"
          />
          {errors.requestDescription && (
            <p className="text-red-500 text-sm">{errors.requestDescription.message}</p>
          )}
        </div>

        {/* Pickup Time */}
        <div>
          <label className="block text-sm font-medium">Preferred Pickup Time</label>
          <input
            type="datetime-local"
            {...register("pickupTime", { required: "Pickup time is required" })}
            className="w-full p-2 border rounded"
          />
          {errors.pickupTime && (
            <p className="text-red-500 text-sm">{errors.pickupTime.message}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Submit
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default RequestModal;
