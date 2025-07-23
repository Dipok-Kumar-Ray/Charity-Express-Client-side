
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import FavoriteCard from "../../MyFavourites.jsx/FavoriteCard";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (!loading && user?.email) {
      axiosSecure.get(`/favorites?email=${user.email}`)
        .then(res => setFavorites(res.data))
        .catch(err => console.error(err));
    }
  }, [user, loading, axiosSecure]);

  const handleRemove = id => {
    axiosSecure.delete(`/favorites/${id}`)
      .then(() => {
        setFavorites(prev => prev.filter(item => item._id !== id));
      })
      .catch(err => console.error("Remove failed:", err));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {favorites.map(item => (
        <FavoriteCard key={item._id} donation={item} handleRemove={handleRemove} />
      ))}
    </div>
  );
};

export default Favorites;
