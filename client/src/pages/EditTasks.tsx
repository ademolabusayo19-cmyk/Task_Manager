import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { FormEvent } from "react";
import type { Task } from "../types/task";

const EditTasks = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // FORM STATES
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");

  // LOADING AND ERROR STATES
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // FETCH THE SELECTED TASK
  useEffect(() => {
    const fetchTask = async () => {
      try {
        if (!id) {
          throw new Error("Task ID is missing");
        }

        const response = await fetch("http://localhost:6741/api/tasks");

        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }

        const tasks: Task[] = await response.json();

        // FIND THE TASK THAT MATCHES THE ID
        const selectedTask = tasks.find((task) => task._id === id);

        if (!selectedTask) {
          throw new Error("Task not found");
        }

        // DISPLAY EXISTING TASK DETAILS
        setTitle(selectedTask.title);
        setDescription(selectedTask.description);
        setTag(selectedTask.tag);
      } catch (error) {
        console.error("Error fetching task:", error);
        setError("Unable to load task");
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  // UPDATE TASK
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!id) {
      setError("Task ID is missing");
      return;
    }

    if (!title.trim() || !description.trim() || !tag) {
      setError("Please complete all fields");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const response = await fetch(`http://localhost:6741/api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
          tag,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      // RETURN TO ALL TASKS
      navigate("/tasks");
    } catch (error) {
      console.error("Error updating task:", error);
      setError("Unable to update task");
    } finally {
      setSaving(false);
    }
  };

  // LOADING MESSAGE
  if (loading) {
    return <p className="p-10 text-gray-600">Loading task...</p>;
  }

  // ERROR MESSAGE
  if (error === "Unable to load task") {
    return (
      <div className="p-10">
        <p className="text-red-600">{error}</p>

        <Link to="/tasks" className="text-purple-700">
          Back to Tasks
        </Link>
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-5 py-12">
      {/* PAGE HEADING */}
      <Link
        to="/tasks"
        className="mb-14 inline-block text-3xl font-semibold text-gray-900"
      >
        ‹ Edit Task
      </Link>

      {/* EDIT TASK FORM */}
      <form onSubmit={handleSubmit} className="space-y-12">
        {/* TASK TITLE */}
        <fieldset className="rounded-md border border-gray-300 px-5 pb-4">
          <legend className="px-2 text-xl text-gray-500">Task Title</legend>

          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Enter task title"
            className="w-full py-3 outline-none"
            required
          />
        </fieldset>

        {/* DESCRIPTION */}
        <fieldset className="rounded-md border border-gray-300 px-5 pb-4">
          <legend className="px-2 text-xl text-gray-500">Description</legend>

          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Briefly describe your task..."
            rows={8}
            className="w-full resize-none py-3 outline-none"
            required
          />
        </fieldset>

        {/* TASK TAG */}
        <fieldset className="rounded-md border border-gray-300 px-5 pb-5">
          <legend className="px-2 text-xl text-gray-500">Tags</legend>

          <div className="flex gap-3 py-2">
            {["Urgent", "Important"].map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setTag(option)}
                className={`cursor-pointer rounded px-4 py-2 transition ${
                  tag === option
                    ? "bg-purple-600 text-white"
                    : "bg-gray-200 text-gray-600 hover:bg-purple-100"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </fieldset>

        {/* ERROR MESSAGE */}
        {error && <p className="text-red-600">{error}</p>}

        {/* SAVE BUTTON */}
        <button
          type="submit"
          disabled={saving}
          className="w-full cursor-pointer rounded-md bg-purple-700 py-5 text-xl font-medium text-white hover:bg-purple-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving ? "Saving..." : "Done"}
        </button>
      </form>

      {/* BACK TO TOP */}
      <div className="mt-12 text-center">
        <a href="#" className="text-purple-700">
          Back To Top
        </a>
      </div>
    </main>
  );
};

export default EditTasks;
