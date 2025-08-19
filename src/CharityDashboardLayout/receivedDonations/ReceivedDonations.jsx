// import { useEffect, useState } from "react";
// import useAuth from "../../hooks/useAuth";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import Swal from "sweetalert2";

import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

// const ReceivedDonations = () => {
//   const { user } = useAuth();
//   const axiosSecure = useAxiosSecure();
//   const [donations, setDonations] = useState([]);
//   const [selectedDonation, setSelectedDonation] = useState(null);

//   // Fetch received donations
//   useEffect(() => {
//     axiosSecure
//       .get(`/charity/received?email=${user.email}`)
//       .then((res) => setDonations(res.data));
//   }, [user.email, axiosSecure]);

//   // Handle Review Submit
//   const handleReviewSubmit = (e) => {
//     e.preventDefault();
//     const form = e.target;
//     const rating = form.rating.value;
//     const comment = form.comment.value;

//     const reviewData = {
//       restaurantId: selectedDonation.restaurantId,
//       restaurantName: selectedDonation.restaurantName,
//       charityEmail: user.email,
//       rating,
//       comment,
//     };

//     axiosSecure.post("/reviews", reviewData).then(() => {
//       Swal.fire("Success", "Review added successfully", "success");
//       setSelectedDonation(null);
//     });
//   };

//   return (
//     <div>
//       <h2 className="text-xl font-bold mb-4">Received Donations</h2>
//       <div className="grid gap-4">
//         {donations.map((donation) => (
//           <div
//             key={donation._id}
//             className="p-4 border rounded shadow bg-white flex justify-between"
//           >
//             <div>
//               <h3 className="font-bold">{donation.donationTitle}</h3>
//               <p>Restaurant: {donation.restaurantName}</p>
//               <p>Food Type: {donation.foodType}</p>
//               <p>Quantity: {donation.quantity}</p>
//               <p>
//                 Pickup Date:{" "}
//                 {new Date(donation.pickupDate).toLocaleDateString()}
//               </p>
//             </div>
//             <button
//               onClick={() => setSelectedDonation(donation)}
//               className="bg-blue-500 text-white px-3 py-1 rounded"
//             >
//               Review
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* Review Modal */}
//       {selectedDonation && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded shadow max-w-sm w-full">
//             <h3 className="text-xl font-bold mb-4">
//               Review for {selectedDonation.restaurantName}
//             </h3>
//             <form onSubmit={handleReviewSubmit}>
//               <input
//                 type="number"
//                 name="rating"
//                 placeholder="Rating (1-5)"
//                 min="1"
//                 max="5"
//                 className="border p-2 w-full mb-3"
//                 required
//               />
//               <textarea
//                 name="comment"
//                 placeholder="Write your review"
//                 className="border p-2 w-full mb-3"
//                 required
//               ></textarea>
//               <div className="flex justify-end gap-2">
//                 <button
//                   type="button"
//                   onClick={() => setSelectedDonation(null)}
//                   className="px-3 py-1 border rounded"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="bg-green-500 text-white px-3 py-1 rounded"
//                 >
//                   Submit
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ReceivedDonations;


// import React, { useState } from "react";
// import useAxiosSecure from "../../hooks/UseAxiosSecure";
// import { useQuery } from "@tanstack/react-query";
// import UseAuth from "../../hooks/UseAuth";
// import LoadingPage from "../../components/LoadingPage";
// import { MdOutlineRateReview } from "react-icons/md";
// import AddReviewModal from "../Reviews/AddReviewModal";

const ReceivedDonations = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [selectedDonation, setSelectedDonation] = useState(null);

  const { data: donations = [], isLoading } = useQuery({
    queryKey: ["receivedDonations", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/requests/received?email=${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) return <span className="loading loading-bars loading-lg"></span>;

  return (
    <div className="p-4 py-10">
      <h2 className="text-2xl font-bold mb-6">Received Donations</h2>

      {donations.length === 0 ? (
        <p className="text-gray-600">No donations received yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {donations.map((donation) => (
            <div
              key={donation._id}
              className="relative card bg-base-300 shadow-lg border border-base-300"
            >

              <div className="card-body">
                <h2 className="card-title">{donation.donationTitle}</h2>
                <p><strong>Restaurant:</strong> {donation.restaurantName}</p>
                <p><strong>Food Type:</strong> {donation.foodType}</p>
                <p><strong>Quantity:</strong> {donation.quantity}</p>
                <p><strong>Pickup Date:</strong> {donation.pickupTime?.split("T")[0]}</p>

                <div className="absolute top-2 right-1">
                  <span className="badge badge-sm badge-success text-xs px-2 py-1 whitespace-nowrap">
                    Picked Up
                  </span>
                </div>

                <button
                  onClick={() => setSelectedDonation(donation)}
                  className="btn btn-outline btn-info btn-sm mt-4"
                >
                  <MdOutlineRateReview className="mr-2" /> Add Review
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Review Modal */}
      {selectedDonation && (
        <AddReviewModal
          donation={selectedDonation}
          onClose={() => setSelectedDonation(null)}
          openReviewModal={!!selectedDonation}
        />
      )}
    </div>
  );
};

export default ReceivedDonations;