import {
  FaTrash,
  FaUserShield,
  FaUtensils,
  FaHandsHelping,
} from "react-icons/fa";

import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const UserManage = () => {
  const useAxios = useAxiosSecure();
  const [users, setUsers] = useState([]);

  // Fetch users from server
  useEffect(() => {
    useAxios
      .get("/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleMakeRole = (id, role) => {
    useAxios
      .patch(`/updateRole/${id}`, { role })
      .then((data) => {
        console.log(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log("create role clicked ", id, role);
  };

  const handleDelete = () => {
    console.log("delete clicked");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Users</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full  border rounded-lg shadow-md">
          <thead>
            <tr className="text-left">
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Actions</th>
              <th className="px-4 py-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={user._id} className="border-t">
                <td className="px-4 py-2">{idx + 1}</td>
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2 capitalize">{user.role || "user"}</td>
                <td className="px-4 py-2">
                  <select
                    defaultValue={
                      typeof user.role === "string"
                        ? user.role
                        : user.role?.role || ""
                    }
                    onChange={(e) => handleMakeRole(user._id, e.target.value)}
                    className="bg-black text-white border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="restaurant">Restaurant</option>
                    <option value="charity">Charity</option>
                  </select>
                </td>

                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm flex items-center gap-1"
                  >
                    <FaTrash /> Delete
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManage;
