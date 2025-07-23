import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaTrash } from "react-icons/fa";

const MyReviews = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    const res = await axiosSecure.get(`/reviews?email=${user.email}`);
    setReviews(res.data);
  };

  const handleDelete = async (id) => {
    await axiosSecure.delete(`/reviews/${id}`);
    fetchReviews();
  };

  useEffect(() => {
    fetchReviews();
  }, [user]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {reviews.map((review) => (
        <div key={review._id} className="card bg-base-100 shadow-md p-4">
          <h2 className="text-lg font-semibold">{review.donationTitle}</h2>
          <p className="text-gray-600">🍴 {review.restaurantName}</p>
          <p className="text-sm text-gray-400">🕒 {new Date(review.time).toLocaleString()}</p>
          <p className="mt-2">{review.description}</p>
          <button onClick={() => handleDelete(review._id)} className="btn btn-sm btn-error mt-3 flex items-center gap-1">
            <FaTrash /> Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default MyReviews;
