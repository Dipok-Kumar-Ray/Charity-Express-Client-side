import useAuth from "../../hooks/useAuth";

const RestaurantProfile = () => {
  const { user } = useAuth(); // লগইন করা রেস্টুরেন্ট ইউজার

  return (
    <div className="p-6 bg-white rounded shadow max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-green-500">Restaurant Profile</h2>
      <img
        src={user?.photoURL}
        alt="Restaurant Logo"
        className="w-28 h-28 rounded-full object-cover mb-4"
      />
      <p className="text-green-500"><strong>Name:</strong> {user?.displayName}</p>
      <p className="text-green-500"><strong>Email:</strong> {user?.email}</p>
      <p className="text-green-500"><strong>Role:</strong> Restaurant</p>
      {/* Optional: আপনি চাইলে নিচের info গুলোও রাখতে পারেন */}
      {/* <p><strong>Address:</strong> 123 Main St, Dhaka</p> */}
      {/* <p><strong>Contact:</strong> +880123456789</p> */}
      {/* <p><strong>Joined:</strong> Jan 1, 2025</p> */}
    </div>
  );
};

export default RestaurantProfile;
