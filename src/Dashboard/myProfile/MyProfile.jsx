import useAuth from "../../hooks/useAuth";

const MyProfile = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-xl mx-auto bg-white shadow-md rounded-2xl p-6 mt-6">
      <div className="flex flex-col items-center space-y-4">
        <img
          src={user?.photoURL}
          alt="User Avatar"
          className="w-28 h-28 rounded-full border-4 border-indigo-500"
        />
        <h2 className="text-2xl font-semibold text-gray-800">
          {user?.displayName}
        </h2>
        <p className="text-gray-600">{user?.email}</p>
        {/* Optional: Future role */}
        <span className="text-sm bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full">
          Role: user
        </span>
        {/* Optional: Edit Profile button */}
        <button className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default MyProfile;
