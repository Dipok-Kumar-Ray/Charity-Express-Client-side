import { useEffect, useState } from "react";
import axios from "axios";

const Feature = () => {
  const [featuredDonations, setFeaturedDonations] = useState([]);

  useEffect(() => {
    axios.get("/donations/featured").then(res => setFeaturedDonations(res.data));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Featured Donations</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {featuredDonations.map(item => (
          <div key={item._id} className="card bg-base-100 shadow">
            <figure><img src={item.image} alt={item.title} /></figure>
            <div className="card-body">
              <h3 className="card-title">{item.title}</h3>
              <p>{item.foodType}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feature;
