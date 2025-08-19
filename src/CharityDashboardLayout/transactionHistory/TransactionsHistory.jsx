import { useEffect, useState } from "react";
import axios from "axios";

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/charity-requests")
      .then((res) => setTransactions(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Transaction History</h2>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-700">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2 border">Transaction ID</th>
              <th className="px-4 py-2 border">Amount Paid</th>
              <th className="px-4 py-2 border">Request Date</th>
              <th className="px-4 py-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx._id} className="border-b border-gray-700 text-center">
                <td className="px-4 py-2 border">{tx.transactionId}</td>
                <td className="px-4 py-2 border">${tx.amount || 0}</td>
                <td className="px-4 py-2 border">
                  {new Date(tx.createdAt).toLocaleDateString()}
                </td>
                <td
                  className={`px-4 py-2 border font-semibold ${
                    tx.status === "Pending"
                      ? "text-yellow-500"
                      : tx.status === "Approved"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {tx.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionHistory;
