// RequestCharityRole.jsx
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import RequestCharityRoleForm from "./RequestCharityRoleForm";

const stripePromise = loadStripe(import.meta.env.VITE_payment_Gateway_Key);

const RequestCharityRole = () => (
  <Elements stripe={stripePromise}>
    <RequestCharityRoleForm />
  </Elements>
);

export default RequestCharityRole;

