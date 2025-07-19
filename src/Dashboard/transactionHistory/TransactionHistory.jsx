// // components/TransactionHistory.jsx

import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

// import { useEffect, useState } from "react";
// import useAuth from "../../hooks/useAuth";
// import axios from "axios";

const TransactionHistory = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:3000/transactions?email=${user.email}`)
        .then((res) => {
          console.log("Transactions response:", res.data);
          setTransactions(Array.isArray(res.data) ? res.data : []);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching transactions:", err);
          setError("Failed to fetch data");
          setLoading(false);
        });
    }
  }, [user]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx._id}>
              <td>{tx.transactionId || "N/A"}</td>
              <td>${tx.amount || 0}</td>
              <td>{new Date(tx.date).toLocaleDateString()}</td>
              <td>{tx.status || "pending"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionHistory;
