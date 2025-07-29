import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ReviewModal = ({ donationId, user, onClose }) => {
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    const review = {
      ...data,
      userEmail: user.email,
      userName: user.displayName,
      donationId,
      createdAt: new Date(),
    };

    try {
      await axiosSecure.post("/reviews", review);
      Swal.fire("Success", "Review added successfully", "success");
      reset();
      onClose();
    } catch (err) {
      Swal.fire("Error", "Failed to submit review", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-primary bg-opacity-50 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" p-6 rounded shadow max-w-md w-full"
      >
        <h3 className="text-xl font-bold mb-4">Add Review</h3>

        <label className="block mb-2">
          Rating:
          <select
            {...register("rating", { required: true })}
            className="w-full p-2 border rounded"
          >
            <option value="5">5 - Excellent</option>
            <option value="4">4 - Very Good</option>
            <option value="3">3 - Good</option>
            <option value="2">2 - Fair</option>
            <option value="1">1 - Poor</option>
          </select>
        </label>

        <label className="block mb-2">
          Comment:
          <textarea
            {...register("comment", { required: true })}
            className="w-full p-2 border rounded"
          />
        </label>

        <div className="flex justify-end gap-3 mt-4">
          <button type="submit" className="px-4 py-2 bg-purple-600 rounded">
            Submit
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-gray-400  rounded"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewModal;
