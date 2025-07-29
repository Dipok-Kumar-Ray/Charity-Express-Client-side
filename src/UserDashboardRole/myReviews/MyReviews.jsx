import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaTrash } from "react-icons/fa";

const MyReviews = () => {
  const { user, loading } = useAuth();
  console.log(user.email);

  const axiosSecure = useAxiosSecure();
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    const res = await axiosSecure.get(`/reviews?userEmail=${user.email}`);
    setReviews(res.data);
  };

  const handleDelete = async (id) => {
    await axiosSecure.delete(`/reviews/${id}`);
    fetchReviews();
  };
  console.log(reviews);
  useEffect(() => {
    fetchReviews();
  }, []);

  if (loading) {
    return "loading ...";
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {reviews.map((review) => (
        <div
          key={review._id}
          className="border border-gray-200 rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow duration-300"
        >
          <div className="mb-2">
            <h2 className="text-xl font-bold text-primary">
              {review.donationTitle}
            </h2>
            <p className="text-sm text-gray-500">🍴 {review.restaurantName}</p>
          </div>

          <p className="text-gray-700 mt-2">{review.comment}</p>

          <div className="mt-4 flex flex-col gap-1 text-sm text-gray-500">
            <div>
              ⭐ Rating:{" "}
              <span className="font-semibold text-yellow-600">
                {review.rating}
              </span>
              /5
            </div>
            <div>🕒 {new Date(review.reviewDate).toLocaleString()}</div>
          </div>

          <div className="mt-4 border-t pt-3 text-xs text-gray-400">
            Reviewed by:{" "}
            <span className="text-gray-600 font-medium">{review.userName}</span>{" "}
            (<span>{review.userEmail}</span>)
          </div>

          <button
            onClick={() => handleDelete(review._id)}
            className="btn btn-sm btn-error mt-4 w-fit flex items-center gap-1"
          >
            <FaTrash /> Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default MyReviews;
