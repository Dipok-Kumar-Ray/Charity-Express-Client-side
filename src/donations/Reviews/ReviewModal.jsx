import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import PropTypes from "prop-types";

const ReviewModal = ({ donationId, user, onClose }) => {
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    const reviewData = {
      ...data,
      userName: user.displayName,
      userEmail: user.email,
      donationId,
      createdAt: new Date(),
    };

    try {
      await axiosSecure.post("/reviews", reviewData);
      Swal.fire("Success", "Your review has been submitted!", "success");
      reset();
      onClose();
    } catch (error) {
      Swal.fire("Error", "Something went wrong while submitting your review.", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full"
      >
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Submit a Review</h2>

        {/* Reviewer Name */}
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            value={user.displayName}
            readOnly
            className="w-full px-3 py-2 border rounded bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Reviewer Email */}
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={user.email}
            readOnly
            className="w-full px-3 py-2 border rounded bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Rating */}
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
          <select
            {...register("rating", { required: true })}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="">Select Rating</option>
            <option value="5">5 - Excellent</option>
            <option value="4">4 - Very Good</option>
            <option value="3">3 - Good</option>
            <option value="2">2 - Fair</option>
            <option value="1">1 - Poor</option>
          </select>
        </div>

        {/* Comment */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Comment</label>
          <textarea
            {...register("comment", { required: true })}
            rows="4"
            placeholder="Write your feedback..."
            className="w-full px-3 py-2 border rounded resize-none"
          ></textarea>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-4 py-2 rounded transition"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-400 hover:bg-gray-500 text-white font-medium px-4 py-2 rounded transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

//  Prop validation for clean code
ReviewModal.propTypes = {
  donationId: PropTypes.string.isRequired,
  user: PropTypes.shape({
    email: PropTypes.string,
    displayName: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ReviewModal;
