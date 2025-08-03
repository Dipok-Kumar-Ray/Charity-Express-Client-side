import { useQuery, useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const FeatureDonations = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch verified donations
  const { data: donations = [], isLoading, refetch } = useQuery({
    queryKey: ["verified-donations"],
    queryFn: async () => {
      const res = await axiosSecure.get("/donations/verified");
      return res.data;
    },
  });

  // Feature mutation
  const mutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/donations/feature/${id}`);
      return res.data;
    },
    onSuccess: (data) => {
      if (data.modifiedCount > 0) {
        Swal.fire("Success", "Donation Featured!", "success");
        refetch();
      }
    },
    onError: () => {
      Swal.fire("Error", "Failed to feature donation", "error");
    },
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Feature Donations (Admin)</h2>

      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead className="bg-gray-100 text-shadow-blue-600 text-blue-700">
            <tr>
              <th className="p-2 border">Image</th>
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Food Type</th>
              <th className="p-2 border">Restaurant</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation) => (
              <tr key={donation._id} className="text-center">
                <td className="p-2 border">
                  <img
                    src={donation.image}
                    alt={donation.title}
                    className="w-16 h-16 object-cover rounded mx-auto"
                  />
                </td>
                <td className="p-2 border">{donation.title}</td>
                <td className="p-2 border">{donation.foodType}</td>
                <td className="p-2 border">{donation.restaurantName}</td>
                <td className="p-2 border">
                  {donation.isFeatured ? (
                    <span className="text-green-600 font-semibold">Featured</span>
                  ) : (
                    <button
                      onClick={() => mutation.mutate(donation._id)}
                      className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition"
                    >
                      Feature
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeatureDonations;
