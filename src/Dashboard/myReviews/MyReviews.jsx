import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { FaStar } from "react-icons/fa";

const MyReviews = () => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`/reviews?email=${user.email}`)
        .then((res) => {
          setReviews(Array.isArray(res.data) ? res.data : []);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Fetch error:", err);
          setReviews([]);
          setLoading(false);
        });
    }
  }, [user]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/reviews/${id}`);
      setReviews((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  if (loading)
    return (
      <div className="text-center py-10 text-gray-500 font-medium">
        Loading your reviews...
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        My Submitted Reviews
      </h2>

      {reviews.length === 0 ? (
        <p className="text-gray-600">You haven't submitted any reviews yet.</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="border border-gray-200 rounded-lg p-4 shadow hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold text-indigo-700">
                {review.donationTitle}
              </h3>
              <p className="text-gray-700 my-2">{review.description}</p>

              <div className="flex items-center gap-2 text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={i < review.rating ? "fill-yellow-500" : "fill-gray-300"}
                  />
                ))}
                <span className="text-sm text-gray-600">({review.rating}/5)</span>
              </div>

              <p className="text-sm text-gray-500 mt-1">
                Submitted on:{" "}
                {new Date(review.date).toLocaleString("en-US", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </p>

              <button
                onClick={() => handleDelete(review._id)}
                className="mt-3 px-4 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
              >
                Delete Review
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyReviews;
