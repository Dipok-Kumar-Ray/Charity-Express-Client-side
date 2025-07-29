import { useLocation, useNavigate } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useEffect } from "react";
import Swal from "sweetalert2";

const Success = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // Stripe থেকে amount ও transactionId query params দিয়ে পাঠাবে success URL এ
  const query = new URLSearchParams(location.search);
  const amount = query.get("amount");
  const transactionId = query.get("transactionId");

  useEffect(() => {
    if (amount && transactionId && user?.email) {
      const transactionData = {
        email: user.email,
        transactionId,
        amount,
      };

      axiosSecure.post("/transactions", transactionData).then(() => {
        Swal.fire("Success", "Payment successful and transaction saved!", "success");
        navigate("/dashboard/charity/transaction-history");
      });
    }
  }, [amount, transactionId, user?.email, axiosSecure, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold">Processing your payment...</h2>
    </div>
  );
};

export default Success;
