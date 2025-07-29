import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const ReviewSection = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axiosSecure.get(`/reviews/${user?.email}`).then((res) => {
      setReviews(res.data);
    });
  }, [user]);

  return (
    <div className="mt-10">
      <h3 className="text-2xl font-semibold mb-4 text-green-400">Reviews</h3>
      {reviews.length === 0 ? (
        <p className="text-gray-500">No reviews yet.</p>
      ) : (
        <ul className="space-y-4">
          {reviews.map((review) => (
            <li key={review._id} className="border p-4 rounded shadow-sm">
              <div className="flex justify-between mb-2">
                <span className="font-medium">{review.userName}</span>
                <span className="text-sm text-yellow-500">
                  Rating: {review.rating}
                </span>
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReviewSection;
