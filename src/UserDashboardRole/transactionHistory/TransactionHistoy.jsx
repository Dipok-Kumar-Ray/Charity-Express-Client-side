import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";

const TransactionHistory = () => {
  const { user } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await axios.get(`https://charity-ex-server-side-gf29dzrwj-dipok-kumar-rays-projects.vercel.app/transactions/${user.email}`);
        setTransactions(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    if (user?.email) fetchTransactions();
  }, [user]);

  console.log(transactions);
  

  return (
    <div className="max-w-4xl mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Transaction History</h2>
      <div className="overflow-x-auto">
        <table className="table w-full border border-gray-300">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th>#</th>
              <th>Transaction ID</th>
              <th>Amount</th>
              <th>Purpose</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? (
              transactions.map((txn, index) => (
                <tr key={txn.transactionId} className="hover:bg-gray-100">
                  <td>{index + 1}</td>
                  <td className="text-blue-600">{txn.transactionId}</td>
                  <td  className="text-blue-600">${txn.amount}</td>
                  <td  className="text-blue-600">{txn.purpose}</td>
                  <td>
  <span
    className={`px-2 py-1 rounded font-semibold text-blue-600
      ${txn.status === "Approved" ? "bg-green-500 text-white" : ""}
      ${txn.status === "Rejected" ? "bg-red-500 text-white" : ""}
      ${txn.status === "Pending" ? "bg-yellow-500 text-black" : ""}`
    }
  >
    {txn.status || "Pending"}
  </span>
</td>

                  <td  className="text-blue-600">{new Date(txn.date).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No transactions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionHistory;
