import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // ✅ Get user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    // 🚫 Don't call API if user not available
    if (!user) {
      console.log("No user found");
      setLoading(false);
      return;
    }

    fetchTasks();

    // 🔄 Auto refresh every 5 seconds
    const interval = setInterval(() => {
      fetchTasks();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const fetchTasks = async () => {
    try {
     const res = await fetch(
  `${import.meta.env.VITE_API_URL}/tasks?role=${user.role}&userId=${user._id}`

      );

      const data = await res.json();

      console.log("Fetched tasks:", data); // 🔍 debug

      // ✅ Ensure it's always an array
      setTasks(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log("Error fetching tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  // 📊 calculations
  const total = tasks.length;

  const completed = tasks.filter(
    (t) => t.status === "Completed"
  ).length;

  const pending = tasks.filter(
    (t) => t.status === "Pending"
  ).length;

  const inProgress = tasks.filter(
    (t) => t.status === "In Progress"
  ).length;

  const overdue = tasks.filter((t) => {
    return (
      t.dueDate &&
      new Date(t.dueDate) < new Date() &&
      t.status !== "Completed"
    );
  }).length;

  if (loading) {
    return (
      <div className="text-lg font-semibold">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-3 gap-6">

        {/* 🔘 CLICKABLE TOTAL TASKS */}
        <div
          onClick={() => navigate("/tasks")}
          className="bg-white p-5 rounded-xl shadow cursor-pointer hover:bg-gray-50 transition"
        >
          <p className="text-gray-500">Total Tasks</p>
          <h2 className="text-2xl font-bold">{total}</h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500">Pending</p>
          <h2 className="text-2xl font-bold text-yellow-600">
            {pending}
          </h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500">In Progress</p>
          <h2 className="text-2xl font-bold text-blue-600">
            {inProgress}
          </h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500">Completed</p>
          <h2 className="text-2xl font-bold text-green-600">
            {completed}
          </h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500">Overdue</p>
          <h2 className="text-2xl font-bold text-red-600">
            {overdue}
          </h2>
        </div>

      </div>
    </div>
  );
}