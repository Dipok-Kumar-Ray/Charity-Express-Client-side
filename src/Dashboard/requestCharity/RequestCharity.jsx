// import { useState } from "react";
// import useAuth from "../../hooks/useAuth";
// import axios from "axios";
// import { loadStripe } from "@stripe/stripe-js";

import { loadStripe } from "@stripe/stripe-js";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import axios from "axios";

const stripePromise = loadStripe(import.meta.env.VITE_payment_Key);

const RequestCharity = () => {
  const { user } = useAuth();
  const [orgName, setOrgName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const donationInfo = {
      orgName, //  Backend expects this
      email: user?.email,
    };

    try {
      const res = await axios.post("http://localhost:3000/create-checkout-session", donationInfo);

      if (res.data.url) {
        window.location.href = res.data.url; // ✅ Redirect to Stripe checkout
      } else {
        console.error("Stripe session URL not found.");
      }
    } catch (error) {
      console.error("Stripe checkout error:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded">
        <h2 className="text-xl font-bold">Request Charity Role</h2>
        <input
          type="text"
          placeholder="Your Organization Name"
          className="input input-bordered w-full"
          value={orgName}
          onChange={(e) => setOrgName(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary w-full">
          Proceed to Payment
        </button>
      </form>
    </div>
  );
};

export default RequestCharity;
