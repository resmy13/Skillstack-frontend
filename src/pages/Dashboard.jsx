import React, { useState, useEffect } from "react";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [goals, setGoals] = useState([]);
  const [clock, setClock] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const [form, setForm] = useState({
    skillName: "",
    resourceType: "video",
    platform: "",
    progress: "not started",
    hoursSpent: 0,
    difficulty: 1,
    notes: "",
  });

  const [editingGoalId, setEditingGoalId] = useState(null);
  const [editForm, setEditForm] = useState({});

  // Real-time clock
  useEffect(() => {
    const timer = setInterval(() => setClock(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch goals on load
  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const res = await api.get("/goals");
        setGoals(res.data);
      } catch (err) {
        console.error("Failed to fetch goals:", err);
      }
    };
    fetchGoals();
  }, []);

  // Handle input change for add form
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Add new goal
  const addGoal = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/goals", form);
      setGoals([...goals, res.data]);
      setForm({
        skillName: "",
        resourceType: "video",
        platform: "",
        progress: "not started",
        hoursSpent: 0,
        difficulty: 1,
        notes: "",
      });
    } catch (err) {
      console.error("Failed to add goal:", err);
    }
  };

  // Editing handlers...
  const startEditing = (goal) => {
    setEditingGoalId(goal._id);
    setEditForm({ ...goal });
  };

  const handleEditChange = (e) => setEditForm({ ...editForm, [e.target.name]: e.target.value });

  const saveEdit = async (id) => {
    try {
      const res = await api.put(`/goals/${id}`, editForm);
      setGoals(goals.map((goal) => (goal._id === id ? res.data : goal)));
      setEditingGoalId(null);
    } catch (err) {
      console.error("Failed to update goal:", err);
    }
  };

  const cancelEdit = () => {
    setEditingGoalId(null);
    setEditForm({});
  };

  const deleteGoal = async (id) => {
    if (!window.confirm("Are you sure you want to delete this goal?")) return;
    try {
      await api.delete(`/goals/${id}`);
      setGoals(goals.filter((goal) => goal._id !== id));
    } catch (err) {
      console.error("Failed to delete goal:", err);
    }
  };

  return (
    <div className="p-0">
      {/* Navbar */}
      <nav className="flex justify-between items-center bg-blue-600 text-white px-6 py-4 shadow">
        <h1 className="text-xl font-bold">Welcome, {user?.name}</h1>
        <div className="flex items-center gap-6">
          {/* Real-time clock */}
          <span className="text-lg font-mono">{clock.toLocaleTimeString()}</span>

          {/* Calendar toggle */}
          <button
            onClick={() => setShowCalendar(!showCalendar)}
            className="bg-white text-blue-600 px-3 py-1 rounded shadow hover:bg-gray-200"
          >
            📅 Calendar
          </button>

          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Calendar Popup */}
      {showCalendar && (
        <div className="absolute right-6 mt-2 bg-white shadow-lg p-4 rounded z-10">
          <Calendar />
        </div>
      )}

      <div className="p-6 max-w-5xl mx-auto">
        {/* Add Goal Form */}
        <form onSubmit={addGoal} className="bg-white p-6 rounded shadow-md mb-8 space-y-4">
          <h2 className="text-xl font-semibold">Add New Goal</h2>
          <div className="grid grid-cols-2 gap-4">
            <input type="text" name="skillName" placeholder="Skill Name" value={form.skillName} onChange={handleChange} required className="border p-2 rounded" />
            <select name="resourceType" value={form.resourceType} onChange={handleChange} className="border p-2 rounded">
              <option value="video">Video</option>
              <option value="course">Course</option>
              <option value="article">Article</option>
            </select>
            <input type="text" name="platform" placeholder="Platform" value={form.platform} onChange={handleChange} required className="border p-2 rounded" />
            <select name="progress" value={form.progress} onChange={handleChange} className="border p-2 rounded">
              <option value="not started">Not Started</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <input type="number" name="hoursSpent" placeholder="Hours Spent" value={form.hoursSpent} onChange={handleChange} className="border p-2 rounded" />
            <input type="number" name="difficulty" placeholder="Difficulty (1-5)" min="1" max="5" value={form.difficulty} onChange={handleChange} className="border p-2 rounded" />
          </div>
          <textarea name="notes" placeholder="Notes" value={form.notes} onChange={handleChange} className="border p-2 rounded w-full" />
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
            Add Goal
          </button>
        </form>

        {/* Goals List */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Your Goals</h2>
          {goals.length === 0 ? (
            <p>No goals added yet.</p>
          ) : (
            <ul className="space-y-6">
              {goals.map((goal) => (
                <li key={goal._id} className="bg-white p-4 rounded shadow space-y-2">
                  {editingGoalId === goal._id ? (
                    <>
                      {/* Editable fields */}
                      <input type="text" name="skillName" value={editForm.skillName} onChange={handleEditChange} className="border p-2 rounded w-full" />
                      <select name="resourceType" value={editForm.resourceType} onChange={handleEditChange} className="border p-2 rounded w-full">
                        <option value="video">Video</option>
                        <option value="course">Course</option>
                        <option value="article">Article</option>
                      </select>
                      <input type="text" name="platform" value={editForm.platform} onChange={handleEditChange} className="border p-2 rounded w-full" />
                      <select name="progress" value={editForm.progress} onChange={handleEditChange} className="border p-2 rounded w-full">
                        <option value="not started">Not Started</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                      <input type="number" name="hoursSpent" value={editForm.hoursSpent} onChange={handleEditChange} className="border p-2 rounded w-full" />
                      <input type="number" name="difficulty" min="1" max="5" value={editForm.difficulty} onChange={handleEditChange} className="border p-2 rounded w-full" />
                      <textarea name="notes" value={editForm.notes} onChange={handleEditChange} className="border p-2 rounded w-full" />
                      <div className="flex space-x-2 mt-2">
                        <button onClick={() => saveEdit(goal._id)} className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded">Save</button>
                        <button onClick={cancelEdit} className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-1 rounded">Cancel</button>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Display fields */}
                      <h3 className="text-lg font-semibold">{goal.skillName}</h3>
                      <p><strong>Platform:</strong> {goal.platform}</p>
                      <p><strong>Resource:</strong> {goal.resourceType}</p>
                      <p><strong>Progress:</strong> {goal.progress}</p>
                      <p><strong>Hours Spent:</strong> {goal.hoursSpent}</p>
                      <p><strong>Difficulty:</strong> {goal.difficulty}</p>
                      <p><strong>Notes:</strong> {goal.notes}</p>
                      <div className="flex space-x-2 mt-2">
                        <button onClick={() => startEditing(goal)} className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-1 rounded">Edit</button>
                        <button onClick={() => deleteGoal(goal._id)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded">Delete</button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
