import { useState, useContext, useEffect } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../../contexts/AuthContext";

const cardOptions = {
  style: {
    base: {
      color: "#fff",
      fontSize: "16px",
      "::placeholder": { color: "#a0a0a0" },
    },
    invalid: { color: "#ff6b6b" },
  },
};

const RequestCharityRoleForm = () => {
  const { user } = useContext(AuthContext);
  const [organization, setOrganization] = useState("");
  const [mission, setMission] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasPendingRequest, setHasPendingRequest] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const amount = 25; // Fixed amount

  // Check if user already has pending/approved request
  useEffect(() => {
    if (user?.email) {
      axios
        .get(`https://charity-ex-server-side-gf29dzrwj-dipok-kumar-rays-projects.vercel.app/charity-requests/${user.email}`)
        .then((res) => {
          if (
            res.data?.status === "Pending" ||
            res.data?.status === "Approved"
          ) {
            setHasPendingRequest(true);
          }
        })
        .catch(() => setHasPendingRequest(false));
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    if (hasPendingRequest) {
      toast.error("You already have a pending or approved request!");
      return;
    }

    setLoading(true);

    try {
      // 1. Create Payment Intent
      const { data } = await axios.post("https://charity-ex-server-side-gf29dzrwj-dipok-kumar-rays-projects.vercel.app/create-payment-intent", {
        amount,
      });

      // 2. Confirm Payment
      const cardElement = elements.getElement(CardNumberElement);
      if (!cardElement) {
        toast.error("Card element not found");
        setLoading(false);
        return;
      }

      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: user.displayName,
            email: user.email,
          },
        },
      });

      if (result.error) {
        toast.error(result.error.message);
        setLoading(false);
        return;
      }

      if (result.paymentIntent.status === "succeeded") {
        // 3. Save Charity Request (Transaction backend এ auto save হবে)
        await axios.post("https://charity-ex-server-side-gf29dzrwj-dipok-kumar-rays-projects.vercel.app/charity-requests", {
          name: user.displayName,
          email: user.email,
          organization,
          mission,
          transactionId: result.paymentIntent.id,
          amount,
        });

        toast.success("Charity Role Request Submitted Successfully!");
        setOrganization("");
        setMission("");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Payment failed! Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-gray-900 text-white p-6 rounded-xl space-y-4 shadow-md"
    >
      <h2 className="text-xl font-bold text-center mb-2">Request Charity Role</h2>

      {/* Name */}
      <input
        type="text"
        value={user.displayName}
        readOnly
        className="w-full p-2 bg-gray-800 rounded"
      />

      {/* Email */}
      <input
        type="email"
        value={user.email}
        readOnly
        className="w-full p-2 bg-gray-800 rounded"
      />

      {/* Organization */}
      <input
        type="text"
        placeholder="Organization Name"
        value={organization}
        onChange={(e) => setOrganization(e.target.value)}
        required
        className="w-full p-2 bg-gray-800 rounded"
      />

      {/* Mission */}
      <textarea
        placeholder="Mission Statement"
        value={mission}
        onChange={(e) => setMission(e.target.value)}
        required
        className="w-full p-2 bg-gray-800 rounded"
      ></textarea>

      {/* Card Number */}
      <div className="bg-gray-800 p-2 rounded">
        <CardNumberElement options={cardOptions} />
      </div>

      <div className="flex gap-2">
        <div className="bg-gray-800 p-2 rounded flex-1">
          <CardExpiryElement options={cardOptions} />
        </div>
        <div className="bg-gray-800 p-2 rounded flex-1">
          <CardCvcElement options={cardOptions} />
        </div>
      </div>

      {/* Pay Button */}
      <button
        type="submit"
        disabled={loading || hasPendingRequest}
        className={`w-full py-2 rounded font-medium ${
          hasPendingRequest
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-green-500 hover:bg-green-600"
        }`}
      >
         Pay ${amount}
      </button>
    </form>
  );
};

export default RequestCharityRoleForm;
