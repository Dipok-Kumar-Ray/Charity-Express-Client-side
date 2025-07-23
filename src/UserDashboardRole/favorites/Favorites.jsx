import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router";

const Favorites = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const axiosSecure = useAxiosSecure();

  const fetchFavorites = async () => {
    const res = await axiosSecure.get(`/favorites?email=${user.email}`);
    setFavorites(res.data);
  };

  const handleRemove = async (id) => {
    await axiosSecure.delete(`/favorites/${id}`);
    fetchFavorites();
  };

  useEffect(() => {
    fetchFavorites();
  }, [user]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {favorites.map((fav) => (
        <div key={fav._id} className="card bg-base-100 shadow-lg">
          <figure><img src={fav.image} alt={fav.title} className="w-full h-48 object-cover" /></figure>
          <div className="card-body">
            <h2 className="card-title">{fav.title}</h2>
            <p>🍴 {fav.restaurantName}</p>
            <p>📍 {fav.location}</p>
            <p>🚚 Status: {fav.status}</p>
            <p>📦 Quantity: {fav.quantity}</p>
            <div className="card-actions justify-between mt-4">
              <Link to={`/donation/${fav.donationId}`} className="btn btn-primary btn-sm">Details</Link>
              <button onClick={() => handleRemove(fav._id)} className="btn btn-error btn-sm">Remove</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Favorites;
