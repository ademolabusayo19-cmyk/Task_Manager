import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";

import type { Task } from "../types/Task";
import { getTasks, deleteTask } from "../api";

const MyTask = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // FETCH TASKS FROM MONGODB USING AXIOS
  // FETCH TASKS FROM MONGODB
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getTasks();

        setTasks(data);
      } catch (error) {
        console.error("Error loading tasks:", error);
        setError(
          error instanceof Error ? error.message : "Unable to load tasks",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // DELETE TASK FROM MONGODB USING AXIOS
  const handleDeleteTask = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?",
    );

    if (!confirmDelete) return;

    try {
      await deleteTask(id);

      setTasks((previousTasks) =>
        previousTasks.filter((task) => task._id !== id),
      );
    } catch (error) {
      console.error(error);
      alert("Unable to delete task");
    }
  };

  return (
    <main id="top" className="min-h-screen bg-[#FAF9FB] px-5 py-12">
      <div className="mx-auto max-w-245">
        {/* PAGE HEADER */}
        <div className="mb-12 flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-4xl font-semibold text-gray-900">My Tasks</h1>

          <Link
            to="/new"
            className="flex items-center gap-2 text-lg font-medium text-purple-600 hover:text-purple-800"
          >
            <FiPlus size={20} />
            Add New Task
          </Link>
        </div>

        {/* LOADING */}
        {loading && <p className="text-gray-500">Loading tasks...</p>}

        {/* ERROR */}
        {error && <p className="text-red-600">{error}</p>}

        {/* EMPTY TASKS */}
        {!loading && !error && tasks.length === 0 && (
          <p className="text-gray-500">
            No tasks available. Create your first task.
          </p>
        )}

        {/* TASK CARDS */}
        {!loading && !error && (
          <div className="space-y-14">
            {tasks.map((task) => (
              <div
                key={task._id}
                className="rounded-lg border border-gray-300 bg-[#FAF9FB] p-3 sm:p-4"
              >
                {/* TAG AND BUTTONS */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-4">
                  {/* TASK TAG */}
                  <span
                    className={`text-base font-medium ${
                      task.tag === "Urgent" ? "text-red-400" : "text-green-500"
                    }`}
                  >
                    {task.tag}
                  </span>

                  {/* ACTION BUTTONS */}
                  <div className="flex items-center gap-4">
                    {/* EDIT */}
                    <Link
                      to={`/edit/${task._id}`}
                      className="flex items-center gap-2 rounded-md bg-purple-600 px-5 py-2 text-white transition hover:bg-purple-700"
                    >
                      <FiEdit size={17} />
                      Edit
                    </Link>

                    {/* DELETE */}
                    <button
                      type="button"
                      onClick={() => handleDeleteTask(task._id)}
                      className="flex cursor-pointer items-center gap-2 rounded-md border border-purple-500 px-5 py-2 text-purple-600 transition hover:bg-purple-50"
                    >
                      <FiTrash2 size={17} />
                      Delete
                    </button>
                  </div>
                </div>

                {/* TASK TITLE */}
                <h2 className="mt-3 mb-2 text-2xl font-semibold text-gray-900">
                  {task.title}
                </h2>

                {/* TASK DESCRIPTION */}
                <p className="text-base leading-6 text-gray-500">
                  {task.description}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* BACK TO TOP */}
        <div className="mt-14 text-center">
          <a
            href="#top"
            className="text-lg font-medium text-purple-600 hover:text-purple-800"
          >
            Back To Top
          </a>
        </div>
      </div>
    </main>
  );
};

export default MyTask;
