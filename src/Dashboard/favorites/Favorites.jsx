import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const Favorites = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`/favorites?email=${user.email}`)
        .then((res) => {
          console.log("Favorites response:", res.data);

          // ✅ Check if it's actually an array
          if (Array.isArray(res.data)) {
            setFavorites(res.data);
          } else if (Array.isArray(res.data?.data)) {
            setFavorites(res.data.data);
          } else {
            setFavorites([]);
            setError("No valid favorite data received.");
          }
        })
        .catch((err) => {
          console.error("Failed to load favorites:", err);
          setError("Something went wrong while fetching favorites.");
        });
    }
  }, [user?.email]);

  const handleRemove = async (id) => {
    try {
      await axios.delete(`/favorites/${id}`);
      setFavorites((prev) => prev.filter((fav) => fav._id !== id));
    } catch (err) {
      console.error("Failed to remove favorite:", err);
    }
  };

  return (
    <div className="p-6">
      {error && <p className="text-red-500">{error}</p>}

      {Array.isArray(favorites) && favorites.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-4">
          {favorites.map((fav) => (
            <div key={fav._id} className="card shadow">
              <img src={fav.image} alt={fav.title} />
              <div className="p-4">
                <h3>{fav.title}</h3>
                <p>
                  {fav.restaurant} - {fav.location}
                </p>
                <button
                  onClick={() => handleRemove(fav._id)}
                  className="btn btn-error"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !error && <p>No favorites found.</p>
      )}
    </div>
  );
};

export default Favorites;
