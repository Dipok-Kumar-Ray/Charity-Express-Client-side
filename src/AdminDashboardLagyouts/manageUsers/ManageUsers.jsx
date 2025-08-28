import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axiosSecure.get("/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
      Swal.fire("Error", "Failed to fetch users", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle Role Update
  const handleRoleUpdate = (id, role) => {
    Swal.fire({
      title: `Are you sure to make this user ${role}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/role/${id}`, { role }).then(() => {
          Swal.fire("Updated!", `User is now ${role}`, "success");
          fetchUsers();
        });
      }
    });
  };

  // Handle Delete
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This user will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${id}`).then(() => {
          Swal.fire("Deleted!", "User removed successfully", "success");
          fetchUsers();
        });
      }
    });
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-center md:text-left">
        Manage Users
      </h2>

      {/* Loading state */}
      {loading ? (
        <p className="text-center text-gray-500">Loading users...</p>
      ) : users.length === 0 ? (
        <p className="text-center text-gray-500">No users found</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow border">
          <table className="table w-full">
            <thead className="bg-green-100 text-orange-300 text-sm md:text-base">
              <tr>
                <th className="px-2 md:px-4 py-2">Name</th>
                <th className="px-2 md:px-4 py-2">Email</th>
                <th className="px-2 md:px-4 py-2">Role</th>
                <th className="px-2 md:px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="border-t text-xs md:text-sm "
                >
                  <td className="px-2 md:px-4 py-2">{user.name}</td>
                  <td className="px-2 md:px-4 py-2 break-words max-w-[150px] md:max-w-none">
                    {user.email}
                  </td>
                  <td className="px-2 md:px-4 py-2">
                    <span className="capitalize">{user.role || "user"}</span>
                  </td>
                  <td className="px-2 md:px-4 py-2 flex flex-wrap gap-2">
                    {/* Make Admin */}
                    <button
                      onClick={() => handleRoleUpdate(user._id, "admin")}
                      className="btn btn-xs md:btn-sm btn-primary"
                      disabled={user.role === "admin"}
                    >
                      Make Admin
                    </button>

                    {/* Make Restaurant */}
                    <button
                      onClick={() => handleRoleUpdate(user._id, "restaurant")}
                      className="btn btn-xs md:btn-sm btn-success"
                      disabled={user.role === "restaurant"}
                    >
                      Make Restaurant
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="btn btn-xs md:btn-sm btn-error"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
