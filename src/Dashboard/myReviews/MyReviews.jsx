import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const MyReviews = () => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`/reviews?email=${user.email}`)
        .then((res) => {
          console.log("Fetched reviews:", res.data);
          setReviews(Array.isArray(res.data) ? res.data : []);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Fetch error:", err);
          setReviews([]); // fallback
          setLoading(false);
        });
    }
  }, [user]);

  const handleDelete = async (id) => {
    await axios.delete(`/reviews/${id}`);
    setReviews((prev) => prev.filter((r) => r._id !== id));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {reviews.length === 0 ? (
        <p>No reviews found.</p>
      ) : (
        reviews.map((review) => (
          <div key={review._id} className="border p-4 my-2">
            <h4>{review.donationTitle}</h4>
            <p>{review.description}</p>
            <p>{new Date(review.date).toLocaleString()}</p>
            <button onClick={() => handleDelete(review._id)} className="btn btn-sm btn-error">
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default MyReviews;
