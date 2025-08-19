import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const CharityProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (!user?.email) return;

    axiosSecure
      .get(`/charity/profile?email=${user.email}`)
      .then((res) => setProfile(res.data))
      .catch((err) => console.error("Profile fetch error:", err));
  }, [user, axiosSecure]);

  // Firebase fallback + DB data merge
  const displayName = profile?.name || user?.displayName || "No Name";
  const photoURL =
    profile?.photoURL || user?.photoURL || "https://i.ibb.co/placeholder.jpg";
  // const mission = profile?.mission || "No mission statement provided.";
  // const address = profile?.address || "Address not provided.";
  // const phone = profile?.phone || "Phone not provided.";

  return (
    <div className=" h-60 w-60 lg:max-w-xl lg:mx-auto bg-white shadow-md rounded-2xl p-6 mt-6 lg:w-80 lg:h-70">
      <img
        src={photoURL}
        alt="Charity Logo"
        className="w-24 h-24 rounded-full mb-4"
      />
      <h2 className="text-xl font-bold text-green-600">{displayName}</h2>
      <p className="text-green-500">Role: charity</p>
      {/* <p className="mt-2 text-green-600">{mission}</p>
      <p className="text-sm text-gray-500 mt-2">📍 {address}</p> */}
      {/* <p className="text-sm text-gray-500">📞 {phone}</p> */}
    </div>
  );
};

export default CharityProfile;
