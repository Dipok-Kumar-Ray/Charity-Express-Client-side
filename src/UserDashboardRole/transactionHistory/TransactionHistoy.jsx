import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const TransactionHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axiosSecure.get(`/transactions?email=${user.email}`)
      .then(res => setTransactions(res.data));
  }, [user]);

  return (
    <div className="overflow-x-auto shadow rounded-lg">
      <table className="table">
        <thead>
          <tr className="bg-base-200">
            <th>Txn ID</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Status</th>
            <th>Purpose</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(txn => (
            <tr key={txn._id}>
              <td>{txn.transactionId}</td>
              <td>${txn.amount}</td>
              <td>{new Date(txn.date).toLocaleDateString()}</td>
              <td className={`font-semibold ${txn.status === 'Approved' ? 'text-green-500' : txn.status === 'Rejected' ? 'text-red-500' : 'text-yellow-500'}`}>
                {txn.status}
              </td>
              <td>{txn.purpose}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionHistory;
