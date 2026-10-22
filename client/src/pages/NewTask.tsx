import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const NewTask = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const toggleTag = (tag: string) => {
    setTags((previousTags) =>
      previousTags.includes(tag)
        ? previousTags.filter((item) => item !== tag)
        : [...previousTags, tag],
    );
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSaving(true);
    setError("");

    try {
      const response = await fetch("http://localhost:6741/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          tags,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create task");
      }

      navigate("/tasks");
    } catch {
      setError("Unable to save task");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="mx-auto max-w-6xl px-5 py-12">
      <Link
        to="/tasks"
        className="mb-14 inline-block text-3xl font-semibold text-gray-900"
      >
        ‹ New Task
      </Link>

      <form onSubmit={handleSubmit} className="space-y-12">
        {/* TASK TITLE */}
        <fieldset className="rounded-md border border-gray-300 px-5 pb-4">
          <legend className="px-2 text-xl text-gray-500">Task Title</legend>

          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="E.g Project Defense, Assignment ..."
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

        {/* TAGS */}
        <fieldset className="rounded-md border border-gray-300 px-5 pb-5">
          <legend className="px-2 text-xl text-gray-500">Tags</legend>

          <div className="flex gap-3 py-2">
            {["Urgent", "Important"].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className={`cursor-pointer rounded px-4 py-2 ${
                  tags.includes(tag)
                    ? "bg-purple-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </fieldset>

        {error && <p className="text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={saving}
          className="w-full cursor-pointer rounded-md bg-purple-700 py-5 text-xl font-medium text-white hover:bg-purple-800 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Done"}
        </button>
      </form>

      <div className="mt-12 text-center">
        <a href="#" className="text-purple-700">
          Back To Top
        </a>
      </div>
    </main>
  );
};

export default NewTask;
