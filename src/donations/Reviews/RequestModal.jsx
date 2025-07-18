import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const RequestModal = ({ donation, user, onClose }) => {
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    const requestData = {
      ...data,
      donationId: donation._id,
      userEmail: user.email,
      status: "Pending",
      requestedAt: new Date(),
    };

    try {
      await axiosSecure.post("/requests", requestData);
      Swal.fire("Success", "Request submitted successfully", "success");
      reset();
      onClose();
    } catch (err) {
      Swal.fire("Error", "Failed to submit request", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" p-6 rounded shadow max-w-md w-full"
      >
        <h3 className="text-xl font-bold mb-4">Request Donation</h3>

        <label className="block mb-2">
          Message:
          <textarea
            {...register("message", { required: true })}
            className="w-full p-2 border rounded"
          />
        </label>

        <div className="flex justify-end gap-3 mt-4">
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Submit
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-gray-400 text-white rounded"
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
