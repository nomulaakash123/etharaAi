import { useEffect, useState } from "react";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/projects`);
    const data = await res.json();
    setProjects(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${import.meta.env.VITE_API_URL}/projects`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const newProject = await res.json();

    if (!res.ok) {
      alert(newProject.error);
      return;
    }

    setProjects([newProject, ...projects]);

    setForm({ name: "", description: "" });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Projects</h1>

      {/* CREATE PROJECT */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow mb-6"
      >
        <input
          placeholder="Project Name"
          className="w-full mb-3 p-2 border"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <textarea
          placeholder="Description"
          className="w-full mb-3 p-2 border"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <button className="bg-blue-600 text-white px-4 py-2">
          Add Project
        </button>
      </form>

      {/* PROJECT LIST */}
      <div className="grid grid-cols-3 gap-4">
        {projects.map((p) => (
          <div
            key={p._id}
            className="bg-white p-4 shadow rounded"
          >
            <h2 className="font-bold">{p.name}</h2>
            <p className="text-sm text-gray-500">
              {p.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}