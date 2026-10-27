import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { TASK_TAGS, type TaskInput } from "../types";

// The "props" (inputs) this component expects from its parent
interface TaskFormProps {
  initialValues: TaskInput;
  submitLabel: string;
  onSubmit: (values: TaskInput) => Promise<void>;
}

const labelClass =
  "absolute text-[#9c9c9c] bg-[#faf9fb] text-xl md:text-[30px] -top-5 left-5 px-1";

const fieldClass =
  "w-full px-5 py-4 border border-[#b8b6b6] rounded-[5px] text-lg bg-transparent";

const TaskForm = ({ initialValues, submitLabel, onSubmit }: TaskFormProps) => {
  // Step 1: The form's current values
  const [form, setForm] = useState<TaskInput>(initialValues);

  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState("");

  // Step 2: Update the form when the user types
  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  };

  // Step 3: Submit the form
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Stop the browser from reloading the page

    setError("");

    // CHECK IF ALL FIELDS ARE FILLED
    if (!form.title.trim() || !form.description.trim() || !form.tag) {
      setError("All fields must be filled");
      return;
    }

    try {
      setSubmitting(true);

      // SEND TASK INFORMATION TO THE PARENT COMPONENT
      await onSubmit(form);
    } catch (error) {
      console.error("Error submitting task:", error);

      setError("Unable to save task. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="pt-10 flex flex-col items-start gap-8 w-full"
    >
      {/* TASK TITLE */}
      <div className="relative w-full">
        <label htmlFor="title" className={labelClass}>
          Task Title
        </label>

        <input
          id="title"
          name="title"
          type="text"
          className={fieldClass}
          placeholder="E.g project Defence, Assignment"
          value={form.title}
          onChange={handleChange}
          maxLength={100}
          required
        />
      </div>

      {/* DESCRIPTION */}
      <div className="relative w-full">
        <label htmlFor="description" className={labelClass}>
          Description
        </label>

        <input
          id="description"
          name="description"
          type="text"
          className={fieldClass}
          placeholder="Briefly describe your task"
          value={form.description}
          onChange={handleChange}
          required
        />
      </div>

      {/* TAG */}
      <div className="relative w-full">
        <label htmlFor="tag" className={labelClass}>
          Tag
        </label>

        <select
          id="tag"
          name="tag"
          className={fieldClass}
          value={form.tag}
          onChange={handleChange}
          required
        >
          <option value="">Choose a tag</option>

          {TASK_TAGS.map((tag) => {
            return (
              <option key={tag} value={tag}>
                {tag}
              </option>
            );
          })}
        </select>
      </div>

      {/* ERROR MESSAGE */}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* SUBMIT BUTTON */}
      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-[#974fd0] py-4 text-[#faf9fb] font-medium text-lg rounded-md cursor-pointer hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? "Saving..." : submitLabel}
      </button>
    </form>
  );
};

export default TaskForm;
