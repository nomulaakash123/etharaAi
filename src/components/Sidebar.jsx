import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="w-64 bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>

      <p className="text-sm text-gray-400 mb-6">
        Role: {user?.role}
      </p>

      <nav className="space-y-4">
        <Link to="/dashboard" className="block hover:text-blue-400">
          Dashboard
        </Link>

        <Link to="/projects" className="block hover:text-blue-400">
          Projects
        </Link>

        <Link to="/tasks" className="block hover:text-blue-400">
          Tasks
        </Link>

        <Link to="/team" className="block hover:text-blue-400">
          Team
        </Link>
      </nav>

      <button
        onClick={handleLogout}  // ✅ fixed
        className="mt-8 w-full bg-red-600 p-2 rounded hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
}