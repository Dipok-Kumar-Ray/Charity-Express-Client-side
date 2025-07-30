import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { Link } from "react-router";
import { FaInfoCircle, FaTrash } from "react-icons/fa";

const Favorites = () => {
  const { user, loading } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [Loading, setLoading] = useState(true);

  // Fetch favorites whenever user email changes
  useEffect(() => {
    if (!user?.email) return;

    const fetchFavorites = async () => {
      try {
        const res = await axios.get(
          `https://charity-ex-server-side-gf29dzrwj-dipok-kumar-rays-projects.vercel.app/favorites?userEmail=${user.email}`
        );
        console.log("Fetched favorites:", res.data);
        setFavorites(res.data);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user]);

  if (loading) return "loading............!";

  // Remove favorite
  const handleRemove = async (id) => {
    if (!confirm("Remove this donation from favorites?")) return;

    try {
      await axios.delete(`https://charity-ex-server-side-gf29dzrwj-dipok-kumar-rays-projects.vercel.app/favorites/${id}`);
      setFavorites((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  if (loading) return <p className="text-center mt-6">Loading favorites...</p>;

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {favorites.map((fav) => (
        <div
          key={fav._id}
          className="rounded-xl border border-gray-200 shadow-sm p-4 hover:shadow-md transition duration-300 flex flex-col"
        >
          {/* Image */}
          {fav.image ? (
            <img
              src={fav.image}
              alt={fav.title || "Favorite item"}
              className="w-full h-40 object-cover rounded-lg"
            />
          ) : (
            <div className="w-full h-40 bg-gray-100 flex items-center justify-center rounded-lg text-gray-400 text-sm italic">
              No Image Available
            </div>
          )}

          {/* Title */}
          <h3 className="text-lg font-semibold mt-3">
            {fav.title || "Untitled Donation"}
          </h3>

          {/* Restaurant + Location */}
          <p className="text-sm text-gray-600">
            🍴 {fav.restaurantName || "No Restaurant Info"}
          </p>
          <p className="text-sm text-gray-500">
            📍 {fav.location || "Location not specified"}
          </p>

          {/* Status and Quantity */}
          <div className="text-sm mt-2">
            <p>
              📦 Quantity:{" "}
              <span className="font-medium">
                {fav.quantity ?? "Not specified"}
              </span>
            </p>
            <p>
              🔖 Status:{" "}
              <span className="font-medium">
                {fav.status || "Not available"}
              </span>
            </p>
          </div>

          {/* Date */}
          <p className="text-xs text-gray-400 mt-2">
            📅 Added on:{" "}
            {fav.date ? new Date(fav.date).toLocaleString() : "Unknown"}
          </p>

          {/* Action Buttons */}
          <div className="mt-4 flex justify-between items-center">
            <Link
              to={`/donations/${fav.donationId}`}
              className="btn btn-sm btn-info flex items-center gap-1"
            >
              <FaInfoCircle /> Details
            </Link>
            <button
              onClick={() => handleRemove(fav._id)}
              className="btn btn-sm btn-error flex items-center gap-1"
            >
              <FaTrash /> Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Favorites;



//  useEffect(() => {
//     const reviewFetchData = async () => {
//       try {
//         const res = await axiosSecure.get(`/reviews?userEmail=${user.email}`);
//         setReview(res.data);
//       } catch (error) {
//         console.error("Error fetching donation details", error);
//       }
//     };
//     reviewFetchData();
//   }, [user, axiosSecure]);
//   console.log(review);