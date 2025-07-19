import useAuth from "../../hooks/useAuth";

const MyProfile = () => {
  const { user } = useAuth();

  return (
    <div className="p-6 rounded shadow">
      <img src={user?.photoURL} alt="User" className="w-24 h-24 rounded-full" />
      <h2 className="text-xl font-bold">{user?.displayName}</h2>
      <p className="text-gray-600">{user?.email}</p>
      {/* Optional: Joined date or contact */}
    </div>
  );
};
export default MyProfile;
