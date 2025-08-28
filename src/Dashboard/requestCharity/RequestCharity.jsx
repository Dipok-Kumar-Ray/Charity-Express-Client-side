import { loadStripe } from "@stripe/stripe-js";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import axios from "axios";

const stripePromise = loadStripe(import.meta.env.VITE_payment_Key);

const RequestCharity = () => {
  const { user } = useAuth();
  const [orgName, setOrgName] = useState("");
  const [mission, setMission] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("https://charity-ex-server-side.vercel.app/create-checkout-session", {
        name: user?.displayName,
        email: user?.email,
        orgName,
        mission,
      });

      if (res.data.url) {
        window.location.href = res.data.url;
      }
    } catch (err) {
      console.error(err);
      alert("Payment failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto  p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Request Charity Role</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input value={user?.displayName} readOnly className="input input-bordered w-full" />
        <input value={user?.email} readOnly className="input input-bordered w-full" />
        <input
          placeholder="Organization Name"
          value={orgName}
          onChange={(e) => setOrgName(e.target.value)}
          required
          className="input input-bordered w-full"
        />
        <textarea
          placeholder="Mission Statement"
          value={mission}
          onChange={(e) => setMission(e.target.value)}
          required
          className="textarea textarea-bordered w-full"
        />
        <button type="submit" className="btn btn-primary w-full" disabled={loading}>
          {loading ? "Processing..." : "Pay $25 & Request"}
        </button>
      </form>
    </div>
  );
};

export default RequestCharity;
