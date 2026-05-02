import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!form.name || !form.email || !form.password) {
      setError("All fields are required");
      return;
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Signup failed");
        return;
      }

      setMessage(
        "🎉 You are successfully registered as a Member. Please login from the Login page."
      );

      setTimeout(() => {
        navigate("/");
      }, 2000);

    } catch (err) {
      setError("Network error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900 grid grid-cols-1 md:grid-cols-2">

      {/* LEFT SIDE */}
      <div className="flex flex-col justify-center px-8 md:px-16 text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          Start Managing Tasks <br /> Smarter & Faster
        </h1>

        <p className="text-gray-300 text-base md:text-lg mb-8 leading-relaxed">
          Join our platform to organize tasks, track progress, and stay ahead of deadlines.
          Work smarter with a simple and powerful task management system.
        </p>

        <button
          onClick={() => navigate("/")}
          className="w-fit border border-gray-400 px-6 py-3 rounded-xl hover:bg-white hover:text-black transition"
        >
          Back to Login
        </button>
      </div>

      {/* RIGHT SIDE → FORM (takes 6 columns) */}
      <div className="flex items-center justify-center p-6">
        <div className="bg-gray-900 text-white p-8 rounded-2xl shadow-2xl w-full max-w-md">

          <h2 className="text-3xl font-bold mb-4 text-center">
            Create Account
          </h2>

          {/* SUCCESS */}
          {message && (
            <div className="bg-green-600 text-white text-center p-3 rounded mb-4 font-semibold">
              {message}
            </div>
          )}

          {/* ERROR */}
          {error && (
            <div className="bg-red-500 text-white text-center p-2 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSignup}>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full mb-3 p-3 rounded bg-gray-800 border border-gray-700"
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <input
              type="email"
              placeholder="Email Address"
              className="w-full mb-3 p-3 rounded bg-gray-800 border border-gray-700"
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full mb-3 p-3 rounded bg-gray-800 border border-gray-700"
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />

            <p className="text-sm text-gray-400 mb-4">
              You will be registered as a{" "}
              <b className="text-green-400">Member</b>
            </p>

            <button className="bg-green-600 w-full py-3 rounded-xl font-semibold hover:bg-green-700 transition">
              Sign Up
            </button>
          </form>
        </div>
      </div>

    </div>
  );
}