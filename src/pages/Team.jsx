import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Team() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/users`);
    const data = await res.json();
    setUsers(data);
  };

  // ================= DELETE =================
  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    await fetch(`${import.meta.env.VITE_API_URL}/users/${id}`, {
      method: "DELETE",
    });

    setUsers(users.filter((u) => u._id !== id));
  };

  // ================= EDIT SAVE =================
  const saveEdit = async () => {
    const res = await fetch(
      `http://localhost:5000/users/${editingUser._id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingUser),
      }
    );

    const updated = await res.json();

    setUsers(
      users.map((u) => (u._id === updated._id ? updated : u))
    );

    setEditingUser(null);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Team</h1>

      {/* ================= TABLE ================= */}
      <div className="bg-white shadow rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>

              {user?.role === "Admin" && (
                <th className="p-3">Actions</th>
              )}
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border-t">
                <td className="p-3">{u.name}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3">{u.role}</td>

                {user?.role === "Admin" && (
                  <td className="p-3">
                    <button
                      onClick={() => setEditingUser(u)}
                      className="bg-yellow-500 text-white px-2 py-1 mr-2 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteUser(u._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= EDIT MODAL ================= */}
      {editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-96">
            <h2 className="text-lg font-bold mb-3">
              Edit User
            </h2>

            <input
              className="w-full p-2 border mb-2"
              value={editingUser.name}
              onChange={(e) =>
                setEditingUser({
                  ...editingUser,
                  name: e.target.value,
                })
              }
            />

            <input
              className="w-full p-2 border mb-2"
              value={editingUser.email}
              onChange={(e) =>
                setEditingUser({
                  ...editingUser,
                  email: e.target.value,
                })
              }
            />

            <input
              type="password"
              placeholder="New Password"
              className="w-full p-2 border mb-2"
              onChange={(e) =>
                setEditingUser({
                  ...editingUser,
                  password: e.target.value,
                })
              }
            />

            <select
              className="w-full p-2 border mb-2"
              value={editingUser.role}
              onChange={(e) =>
                setEditingUser({
                  ...editingUser,
                  role: e.target.value,
                })
              }
            >
              <option>Member</option>
              <option>Admin</option>
            </select>

            <div className="flex justify-between">
              <button
                onClick={() => setEditingUser(null)}
                className="bg-gray-400 px-3 py-1 text-white rounded"
              >
                Cancel
              </button>

              <button
                onClick={saveEdit}
                className="bg-green-600 px-3 py-1 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}