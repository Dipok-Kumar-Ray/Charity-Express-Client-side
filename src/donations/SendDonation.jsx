// // import { useForm } from "react-hook-form";
// // import { useState } from "react";
// // import useAxiosPublic from "../hooks/useAxiosPublic";
// // import Swal from "sweetalert2";

// import { useForm } from "react-hook-form";
// import useAxios from "../hooks/useAxios";
// import { useState } from "react";
// import Swal from "sweetalert2";

// const SendDonation = () => {
//   const { register, handleSubmit, reset, formState: { errors } } = useForm();
//   const axiosPublic = useAxios();
//   const [submitting, setSubmitting] = useState(false);

//   const onSubmit = async (data) => {
//     setSubmitting(true);
//     try {
//       const res = await axiosPublic.post("/donations", data);
//       if (res.data.insertedId || res.data._id) {
//         Swal.fire({
//           icon: "success",
//           title: "Donation Submitted",
//           text: "Your donation has been saved successfully!",
//           timer: 2000,
//           showConfirmButton: false,
//         });
//         reset();
//       } else {
//         throw new Error("Insertion failed");
//       }
//     } catch (error) {
//       console.error("Error saving donation:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Submission Failed",
//         text: "Please try again later.",
//       });
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="p-6 max-w-3xl mx-auto">
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
//         <div className="text-center">
//           <h2 className="text-3xl font-bold">Submit a Food Donation</h2>
//           <p className="text-gray-500">Please fill in all required fields</p>
//         </div>

//         <div className="border p-6 rounded-xl shadow-md space-y-4">
//           <div>
//             <label className="label">Donation Title</label>
//             <input
//               {...register("title", { required: true })}
//               className="input input-bordered w-full"
//               placeholder="E.g., Leftover Chicken Biryani"
//             />
//             {errors.title && <p className="text-red-500 text-sm">Title is required</p>}
//           </div>

//           <div>
//             <label className="label">Description</label>
//             <textarea
//               {...register("description", { required: true })}
//               className="textarea textarea-bordered w-full"
//               placeholder="Details about the food"
//             />
//             {errors.description && <p className="text-red-500 text-sm">Description is required</p>}
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="label">Food Type</label>
//               <input
//                 {...register("foodType", { required: true })}
//                 className="input input-bordered w-full"
//                 placeholder="Cooked, Packaged, etc."
//               />
//               {errors.foodType && <p className="text-red-500 text-sm">Food type is required</p>}
//             </div>
//             <div>
//               <label className="label">Quantity</label>
//               <input
//                 {...register("quantity", { required: true })}
//                 className="input input-bordered w-full"
//                 placeholder="E.g., 10 plates"
//               />
//               {errors.quantity && <p className="text-red-500 text-sm">Quantity is required</p>}
//             </div>
//           </div>

//           <div>
//             <label className="label">Pickup Instructions</label>
//             <input
//               {...register("pickupInstructions", { required: true })}
//               className="input input-bordered w-full"
//               placeholder="Enter pickup instructions"
//             />
//             {errors.pickupInstructions && <p className="text-red-500 text-sm">Pickup instruction required</p>}
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="label">Restaurant Name</label>
//               <input
//                 {...register("restaurantName", { required: true })}
//                 className="input input-bordered w-full"
//                 placeholder="Your restaurant or organization"
//               />
//               {errors.restaurantName && <p className="text-red-500 text-sm">Restaurant name is required</p>}
//             </div>
//             <div>
//               <label className="label">Location</label>
//               <input
//                 {...register("location", { required: true })}
//                 className="input input-bordered w-full"
//                 placeholder="Location or address"
//               />
//               {errors.location && <p className="text-red-500 text-sm">Location is required</p>}
//             </div>
//           </div>

//           <div>
//             <label className="label">Pickup Time Window</label>
//             <input
//               {...register("pickupTime", { required: true })}
//               className="input input-bordered w-full"
//               placeholder="E.g., 6PM - 9PM"
//             />
//             {errors.pickupTime && <p className="text-red-500 text-sm">Pickup time is required</p>}
//           </div>
//         </div>

//         <div className="text-center">
//           <button
//             type="submit"
//             className="btn btn-primary px-8"
//             disabled={submitting}
//           >
//             {submitting ? "Submitting..." : "Submit Donation"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default SendDonation;
