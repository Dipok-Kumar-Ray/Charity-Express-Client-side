// import { useEffect, useState } from "react";
// import useAuth from "../../hooks/useAuth";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import Swal from "sweetalert2";

import { useMutation, useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

// const MyPickups = () => {
//   const { user } = useAuth();
//   const axiosSecure = useAxiosSecure();
//   const [pickups, setPickups] = useState([]);

//   // Fetch Accepted Pickups
//   useEffect(() => {
//     if (user?.email) {
//       axiosSecure
//         .get(`/charity/pickups?email=${user.email}`)
//         .then((res) => setPickups(res.data))
//         .catch((err) => console.error("Error fetching pickups:", err));
//     }
//   }, [user?.email, axiosSecure]);

//   // Confirm Pickup
//   const handleConfirmPickup = (id) => {
//     Swal.fire({
//       title: "Confirm Pickup?",
//       text: "This donation will be marked as Picked Up.",
//       icon: "question",
//       showCancelButton: true,
//       confirmButtonText: "Yes, confirm",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         axiosSecure.put(`/charity/pickups/${id}`).then(() => {
//           setPickups(pickups.filter((p) => p._id !== id));
//           Swal.fire("Confirmed!", "Pickup confirmed successfully.", "success");
//         });
//       }
//     });
//   };

//   return (
//     <div className="grid gap-4">
//       {/* No Data Fallback */}
//       {pickups.length === 0 && (
//         <p className="text-center text-gray-500">No pickups found</p>
//       )}

//       {/* Show Pickups */}
//       {pickups.map((pickup) => (
//         <div key={pickup._id} className="p-4 border rounded shadow bg-white">
//           <h3 className="font-bold">{pickup.donationTitle}</h3>
//           <p>Restaurant: {pickup.restaurantName}</p>
//           <p>Location: {pickup.location}</p>
//           <p>Food Type: {pickup.foodType}</p>
//           <p>Quantity: {pickup.quantity}</p>
//           <p>Status: {pickup.status}</p>
//           <button
//             onClick={() => handleConfirmPickup(pickup._id)}
//             className="bg-green-500 text-white px-3 py-1 rounded mt-2"
//           >
//             Confirm Pickup
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default MyPickups;


// import React from "react";
// import { useQuery, useMutation } from "@tanstack/react-query";
// import Swal from "sweetalert2";
// import UseAuth from "../../hooks/UseAuth";
// import LoadingPage from "../../components/LoadingPage";

const MyPickups = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {
    data: pickups = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myPickups", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/requests/pickups?email=${user.email}`);
      return res.data;
    },
  });

  const { mutate: confirmPickup, isPending } = useMutation({
    mutationFn: async ({ requestId, donationId }) => {
      return await axiosSecure.patch(`/requests/picked-up/${requestId}`, {
        donationId,
      });
    },
    onSuccess: (data) => {
      if (data.data.modifiedCount > 0) {
        Swal.fire("Confirmed!", "Donation marked as picked up.", "success");
        refetch();
      }
    },
    onError: () => {
      Swal.fire("Error", "Something went wrong.", "error");
    },
  });

  const handleConfirmPickup = (requestId, donationId) => {
    Swal.fire({
      title: "Confirm Pickup?",
      text: "Are you sure you have picked up this donation?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        confirmPickup({ requestId, donationId });
      }
    });
  };

  if (isLoading) return <span className="loading loading-bars loading-lg"></span>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">My Pickups</h2>

      {pickups.length === 0 ? (
        <p className="text-gray-600">No assigned pickups yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {pickups.map((pickup) => (
            <div
              key={pickup._id}
              className="border p-4 rounded-lg shadow bg-base-300 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-semibold mb-2">{pickup.donationTitle}</h3>
                <p>
                  <strong>Restaurant:</strong> {pickup.restaurantName}
                </p>
                <p>
                  <strong>Location:</strong> {pickup.location}
                </p>
                <p>
                  <strong>Food Type:</strong> {pickup.foodType}
                </p>
                <p>
                  <strong>Quantity:</strong> {pickup.quantity}
                </p>
                <p>
                  <strong>Pickup Time:</strong> {pickup.pickupTime.split("T")[0]}
                </p>
                <p className="mt-2">
                  <strong>Status:</strong>{" "}
                  <span
                    className={`${
                      pickup.status === "Picked Up"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {pickup.status === "Picked Up" ? "Picked Up" : "Assigned"}
                  </span>
                </p>
              </div>

              {pickup.status !== "Picked Up" && (
                <button
                  onClick={() => handleConfirmPickup(pickup._id, pickup.donationId)}
                  disabled={isPending}
                  className="mt-4 btn btn-success btn-sm"
                >
                  {isPending ? "Updating..." : "Confirm Pickup"}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPickups;