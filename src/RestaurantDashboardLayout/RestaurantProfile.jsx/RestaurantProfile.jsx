import useAuth from "../../hooks/useAuth";


const RestaurantProfile = () => {
  const { user } = useAuth();

  return (
    <div className="p-6 bg-white rounded shadow lg:h-70 lg:w-70">
      <img
        src={user?.photoURL}
        alt="Restaurant Logo"
        className="w-24 h-24 rounded-full mb-4"
      />
      <h2 className="text-green-400 text-2xl font-bold">{user?.displayName}</h2>
      <p className="text-green-400">Email: {user?.email}</p>
      <p className="text-green-400">Role: Restaurant</p>
    </div>
  );
};

export default RestaurantProfile;
