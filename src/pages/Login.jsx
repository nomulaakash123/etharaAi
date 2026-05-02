import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }

      login(data);
      setShowModal(false);

      if (data.role === "admin") navigate("/");
      else navigate("/dashboard");
    } catch {
      setError("Network error. Please try again.");
    }
  };

  return (
    <div className="h-screen w-full bg-gradient-to-br from-black via-gray-900 to-emerald-900 flex items-center justify-between px-16">

      {/* LEFT SIDE */}
      <div className="max-w-xl text-left text-white">
        <h1 className="text-5xl font-bold leading-tight mb-6">
          Manage Your Tasks <br /> With Clarity & Control
        </h1>

        <p className="text-lg text-gray-300 mb-8 leading-relaxed">
          Take full control of your workflow with a simple yet powerful task
          management system. Organize tasks, track progress in real-time, and
          stay ahead of deadlines.
        </p>

        <div className="flex gap-4">
          <button
            onClick={() => setShowModal(true)}
            className="bg-emerald-600 px-6 py-3 rounded-xl font-semibold hover:bg-emerald-700 transition"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="border border-emerald-400 px-6 py-3 rounded-xl font-semibold hover:bg-emerald-400 hover:text-black transition"
          >
            Sign Up
          </button>
        </div>
      </div>

      {/* RIGHT SIDE SVG */}
      <div className="hidden md:flex items-center justify-center w-1/2">
        <svg width="400" height="400" viewBox="0 0 500 500" fill="none">
          {/* Background circle */}
          <circle cx="250" cy="250" r="200" fill="#065f46" opacity="0.2" />

          {/* Task card */}
          <rect x="150" y="120" width="200" height="220" rx="20" fill="#111827" stroke="#10b981" strokeWidth="2"/>

          {/* Lines */}
          <rect x="180" y="160" width="140" height="10" rx="5" fill="#10b981"/>
          <rect x="180" y="190" width="100" height="10" rx="5" fill="#34d399"/>
          <rect x="180" y="220" width="120" height="10" rx="5" fill="#6ee7b7"/>

          {/* Check circles */}
          <circle cx="165" cy="165" r="6" fill="#22c55e"/>
          <circle cx="165" cy="195" r="6" fill="#a3e635"/>
          <circle cx="165" cy="225" r="6" fill="#4ade80"/>

          {/* Clock */}
          <circle cx="250" cy="320" r="30" stroke="#10b981" strokeWidth="3"/>
          <line x1="250" y1="320" x2="250" y2="305" stroke="#10b981" strokeWidth="2"/>
          <line x1="250" y1="320" x2="265" y2="320" stroke="#10b981" strokeWidth="2"/>
        </svg>
      </div>

      {/* LOGIN MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center">
          <div className="bg-gray-900 text-white p-6 rounded-xl w-96 relative border border-emerald-700">

            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-3 text-gray-400 text-xl"
            >
              ×
            </button>

            <h2 className="text-2xl font-bold mb-4 text-center text-emerald-400">
              Login
            </h2>

            <form onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Email"
                className="w-full p-2 mb-3 rounded bg-gray-800 border border-emerald-700"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />

              <input
                type="password"
                placeholder="Password"
                className="w-full p-2 mb-3 rounded bg-gray-800 border border-emerald-700"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />

              {error && (
                <p className="text-red-400 text-sm mb-2">
                  {error}
                </p>
              )}

              <button className="bg-emerald-600 w-full py-2 rounded hover:bg-emerald-700">
                Login
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}