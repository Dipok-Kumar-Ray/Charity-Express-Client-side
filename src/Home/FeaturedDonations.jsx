import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Link } from "react-router";

const FeaturedDonations = () => {
  const axiosPublic = useAxiosSecure();

  const { data: featured = [], isLoading } = useQuery({
    queryKey: ["featured-donations"],
    queryFn: async () => {
      const res = await axiosPublic.get("/donations/featured");
      return res.data;
    },
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="my-8">
      <h2 className="text-3xl font-bold text-center">Featured Donations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {featured.map((donation) => (
          <div key={donation._id} className="card bg-base-100 shadow-md">
            <figure>
              <img
                src={donation.image}
                alt={donation.title}
                className="h-40 w-full object-cover"
              />
            </figure>
            <div className="card-body">
              <h3 className="text-xl font-bold">{donation.title}</h3>
              <p>{donation.foodType}</p>
              <p className="text-sm text-gray-500">{donation.restaurantName}</p>

              {/* Details button to navigate to donation details page */}
              <Link to={`/donationDetails/${donation._id}`}>
                <button className="btn btn-sm btn-outline mt-2 w-full">
                  Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedDonations;
