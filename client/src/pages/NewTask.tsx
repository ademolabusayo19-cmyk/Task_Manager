import { useNavigate } from "react-router-dom";
import { createTask } from "../api";
import PageHeader from "../components/PageHeader";
import TaskForm from "../components/TaskForm";
import type { TaskInput } from "../types";

const emptyTask: TaskInput = {
  title: "",
  description: "",
  tag: "",
};

const NewTask = () => {
  const Navigate = useNavigate();
  // Called by TaskForm when the user clicks "Done"
  const handleCreate = async (values: TaskInput) => {
    await createTask(values);
    Navigate("/tasks");
  };
  return (
    <main className="max-w-360 mx-auto px-5 md:px-42.5 py-10 md:py-16 flex flex-col items-start">
      <PageHeader title="New Task" />

      <TaskForm
        initialValues={emptyTask}
        submitLabel="Done"
        onSubmit={handleCreate}
      />
    </main>
  );
};

export default NewTask;
