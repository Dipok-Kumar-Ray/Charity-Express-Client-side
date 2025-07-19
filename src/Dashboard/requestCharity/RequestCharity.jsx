import { loadStripe } from "@stripe/stripe-js";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import axios from "axios";

const stripePromise = loadStripe(import.meta.env.VITE_payment_Key);

const RequestCharity = () => {
  const { user } = useAuth();
  const [orgName, setOrgName] = useState("");
  const [mission, setMission] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const stripe = await stripePromise;
    const { data } = await axios.post("/create-checkout-session", {
      email: user.email,
      name: user.displayName,
      organization: orgName,
      mission,
    });

    stripe.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 rounded shadow">
      <input value={user.displayName} readOnly className="input input-bordered w-full" />
      <input value={user.email} readOnly className="input input-bordered w-full" />
      <input onChange={e => setOrgName(e.target.value)} placeholder="Organization Name" className="input input-bordered w-full" required />
      <textarea onChange={e => setMission(e.target.value)} placeholder="Mission Statement" className="textarea textarea-bordered w-full" required></textarea>
      <button type="submit" className="btn btn-primary">Pay $25</button>
    </form>
  );
};

export default RequestCharity;
