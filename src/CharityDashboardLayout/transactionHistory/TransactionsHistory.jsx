import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const TransactionsHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [transactions, setTransactions] = useState([]);

  // Fetch transactions
  useEffect(() => {
    axiosSecure
      .get(`/charity/transactions?email=${user.email}`)
      .then((res) => setTransactions(res.data));
  }, [user.email, axiosSecure]);

  return (
    <div className="overflow-x-auto">
      <h2 className="text-xl font-bold mb-4">Transaction History</h2>
      <table className="min-w-full  border">
        <thead>
          <tr className="">
            <th className="py-2 px-4 border">Transaction ID</th>
            <th className="py-2 px-4 border">Amount</th>
            <th className="py-2 px-4 border">Date</th>
            <th className="py-2 px-4 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t._id}>
              <td className="py-2 px-4 border">{t.transactionId}</td>
              <td className="py-2 px-4 border">${t.amount}</td>
              <td className="py-2 px-4 border">
                {new Date(t.date).toLocaleDateString()}
              </td>
              <td className="py-2 px-4 border">{t.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsHistory;
