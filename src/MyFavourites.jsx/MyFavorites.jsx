import { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";

const MyFavorites = () => {
  const axiosSecure = useAxiosSecure();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    axiosSecure
      .get("/favorites")
      .then((res) => setFavorites(res.data))
      .catch((err) => console.error(err));
  }, [axiosSecure]);

  return (
    <div>
      <h2>My Favorites</h2>
      <ul>
        {favorites.map((fav) => (
          <li key={fav._id}>{fav.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default MyFavorites;
