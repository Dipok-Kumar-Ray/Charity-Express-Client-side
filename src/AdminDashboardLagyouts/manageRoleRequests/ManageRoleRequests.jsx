import { useQuery, useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageRoleRequests = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch all charity role requests
  const { data: requests = [], isLoading, refetch } = useQuery({
    queryKey: ["charity-role-requests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/charity-requests");
      return res.data;
    },
  });

  // Approve request mutation
  const approveMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/charity-requests/approve/${id}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Success", "Request Approved & Role Updated!", "success");
      refetch();
    },
    onError: () => {
      Swal.fire("Error", "Failed to approve request", "error");
    },
  });

  // Reject request mutation
  const rejectMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/charity-requests/reject/${id}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Rejected", "Request Rejected!", "info");
      refetch();
    },
    onError: () => {
      Swal.fire("Error", "Failed to reject request", "error");
    },
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Charity Role Requests</h2>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-700">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2 border">User Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Organization</th>
              <th className="px-4 py-2 border">Mission</th>
              <th className="px-4 py-2 border">Transaction ID</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req._id} className="border-b border-gray-700 text-center">
                <td className="px-4 py-2 border">{req.name || "N/A"}</td>
                <td className="px-4 py-2 border">{req.email}</td>
                <td className="px-4 py-2 border">{req.organization}</td>
                <td className="px-4 py-2 border">{req.mission}</td>
                <td className="px-4 py-2 border">{req.transactionId}</td>

                {/* Status Color */}
                <td
                  className={`px-4 py-2 border font-semibold ${
                    req.status === "Pending"
                      ? "text-yellow-500"
                      : req.status === "Approved"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {req.status}
                </td>

                {/* Actions */}
                <td className="px-4 py-2 border space-x-2">
                  {req.status === "Pending" && (
                    <>
                      <button
                        onClick={() => approveMutation.mutate(req._id)}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => rejectMutation.mutate(req._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Reject
                      </button>
                    </>
                  )}

                  {req.status === "Approved" && (
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded opacity-60 cursor-not-allowed"
                      disabled
                    >
                      Approved
                    </button>
                  )}

                  {req.status === "Rejected" && (
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded opacity-60 cursor-not-allowed"
                      disabled
                    >
                      Rejected
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageRoleRequests;
