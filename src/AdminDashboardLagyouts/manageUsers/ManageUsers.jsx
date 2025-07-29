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
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>

      {/* Loading state */}
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role || "user"}</td>
                  <td className="space-x-2">
                    {/* Make Admin Button */}
                    <button
                      onClick={() => handleRoleUpdate(user._id, "admin")}
                      className="btn btn-xs btn-primary"
                      disabled={user.role === "admin"}
                    >
                      Make Admin
                    </button>

                    {/* Make Restaurant Button */}
                    <button
                      onClick={() => handleRoleUpdate(user._id, "restaurant")}
                      className="btn btn-xs btn-success"
                      disabled={user.role === "restaurant"}
                    >
                      Make Restaurant
                    </button>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="btn btn-xs btn-error"
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
