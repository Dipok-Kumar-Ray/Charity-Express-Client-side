
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const RequestCharityRole = () => {
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    const res = await axiosSecure.post("/create-payment-intent", {
      amount: 25,
    });

    const clientSecret = res.data.clientSecret;

    const card = elements.getElement(CardElement);
    const { paymentIntent, error } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card,
          billing_details: {
            name: user.displayName,
            email: user.email,
          },
        },
      }
    );

    if (error) {
      return Swal.fire("Payment Failed", error.message, "error");
    }

    await axiosSecure.post("/charity-request", {
      name: user.displayName,
      email: user.email,
      orgName: data.orgName,
      mission: data.mission,
      transactionId: paymentIntent.id,
    });

    Swal.fire("Success!", "Charity request submitted!", "success");
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input value={user.displayName} readOnly className="input input-bordered w-full" />
      <input value={user.email} readOnly className="input input-bordered w-full" />
      <input {...register("orgName")} placeholder="Organization Name" className="input input-bordered w-full" required />
      <textarea {...register("mission")} placeholder="Mission Statement" className="textarea textarea-bordered w-full" required />
      <CardElement className="border p-2 rounded" />
      <button className="btn btn-primary mt-4" type="submit">
        Pay $25 and Request
      </button>
    </form>
  );
};
export default RequestCharityRole;