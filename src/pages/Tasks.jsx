import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);

  const { user } = useAuth();

  const [form, setForm] = useState({
    title: "",
    description: "",
    assignedTo: "",
    project: "",
    status: "Pending",
    dueDate: "",
  });

  // =====================
  // FETCH DATA
  // =====================
  useEffect(() => {
    if (!user) return;

    fetchTasks();

    if (user.role === "Admin") {
      fetchUsers();
      fetchProjects();
    }
  }, [user]);

  const fetchTasks = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/tasks?role=${user.role}&userId=${user._id}`
      );
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch("${import.meta.env.VITE_API_URL}/users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await fetch("${import.meta.env.VITE_API_URL}/projects");
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.log(err);
    }
  };

  // =====================
  // OVERDUE LOGIC
  // =====================
  const isOverdue = (task) => {
    if (!task.dueDate) return false;
    return (
      new Date(task.dueDate) < new Date() &&
      task.status !== "Completed"
    );
  };

  // =====================
  // CREATE TASK (ADMIN ONLY)
  // =====================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("${import.meta.env.VITE_API_URL}/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        createdBy: user._id,
      }),
    });

    const newTask = await res.json();
    setTasks([newTask, ...tasks]);

    setForm({
      title: "",
      description: "",
      assignedTo: "",
      project: "",
      status: "Pending",
      dueDate: "",
    });
  };

  // =====================
  // STATUS UPDATE
  // =====================
  const updateStatus = async (id, status) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    const updated = await res.json();
    setTasks(tasks.map((t) => (t._id === id ? updated : t)));
  };

  // =====================
  // DELETE (ADMIN ONLY)
  // =====================
  const deleteTask = async (id) => {
    await fetch(`${import.meta.env.VITE_API_URL}/tasks/${id}`, {
      method: "DELETE",
    });

    setTasks(tasks.filter((t) => t._id !== id));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Tasks</h1>

      {/* ================= ADMIN CREATE ================= */}
      {user?.role === "Admin" && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow mb-6"
        >
          <input
            placeholder="Task Title"
            className="w-full mb-2 p-2 border"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
          />

          <textarea
            placeholder="Description"
            className="w-full mb-2 p-2 border"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          {/* PROJECT DROPDOWN */}
          <select
            className="w-full mb-2 p-2 border"
            value={form.project}
            onChange={(e) =>
              setForm({ ...form, project: e.target.value })
            }
          >
            <option value="">Select Project</option>
            {projects.map((p) => (
              <option key={p._id} value={p.name}>
                {p.name}
              </option>
            ))}
          </select>

          {/* ASSIGNEE */}
          <select
            className="w-full mb-2 p-2 border"
            value={form.assignedTo}
            onChange={(e) =>
              setForm({ ...form, assignedTo: e.target.value })
            }
          >
            <option value="">Select Member</option>
            {users.map((u) => (
              <option key={u._id} value={u._id}>
                {u.name}
              </option>
            ))}
          </select>

          {/* DUE DATE */}
          <label className="text-sm text-gray-600">
            Due Date
          </label>
          <input
            type="date"
            className="w-full mb-2 p-2 border"
            value={form.dueDate}
            onChange={(e) =>
              setForm({ ...form, dueDate: e.target.value })
            }
          />

          <button className="bg-blue-600 text-white px-4 py-2">
            Create Task
          </button>
        </form>
      )}

      {/* ================= TASK LIST ================= */}
      <div className="grid grid-cols-3 gap-4">
        {tasks.map((task) => (
          <div
            key={task._id}
            className={`p-4 shadow rounded bg-white border ${
              isOverdue(task) ? "border-red-500" : ""
            }`}
          >
            <h2 className="font-bold">{task.title}</h2>

            {/* PROJECT */}
            <p className="text-sm text-gray-600">
              📁 Project: {task.project || "General"}
            </p>

            <p className="text-sm mt-1">
              {task.description}
            </p>

            <p className="text-sm mt-1">
              👤 {
  typeof task.assignedTo === "object"
    ? task.assignedTo.name
    : users.find(u => u._id === task.assignedTo)?.name || "Unassigned"
}
            </p>

            {/* DUE DATE LABEL FIX */}
            {task.dueDate && (
              <p className="text-xs text-gray-500">
                📅 Due Date:{" "}
                {new Date(task.dueDate).toDateString()}
              </p>
            )}

            {/* OVERDUE */}
            {isOverdue(task) && (
              <p className="text-red-500 font-bold text-sm">
                ⚠ Overdue
              </p>
            )}

            {/* STATUS */}
            <select
              value={task.status}
              onChange={(e) =>
                updateStatus(task._id, e.target.value)
              }
              className="mt-2 border p-1 w-full"
            >
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>

            {/* DELETE */}
            {user?.role === "Admin" && (
              <button
                onClick={() => deleteTask(task._id)}
                className="mt-2 bg-red-500 text-white px-2 py-1"
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}