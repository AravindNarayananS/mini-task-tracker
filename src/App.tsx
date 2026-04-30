
// React core hooks
import { useMemo, useState } from "react";
// Feature Components (Task Module)
import TaskInput from "./components/task/TaskInput";
import TaskList from "./components/task/TaskList";
import ProgressBar from "./components/UI/ProgressBar";
// Types
import type { Task } from "./types/Task";
// Notifications (Toast system)
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Custom Hooks
import { useLocalStorage } from "./utils/storage";

// Local Storage Key
const STORAGE_KEY = "tasks";

function App() {
  // =========================================================
  // STATE: Persistent task storage (localStorage-backed)
  // =========================================================
  const [tasks, setTasks] = useLocalStorage<Task[]>(STORAGE_KEY, []);

  // Current filter category (All / Work / Personal / Study)
  const [filter, setFilter] = useState("All");

  // Currently editing task reference (if any)
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // =========================================================
  // ADD or UPDATE TASK
  // =========================================================
  const addOrUpdateTask = (title: string, category: string) => {
    if (!title.trim()) {
      toast.error("Task title cannot be empty!");
      return;
    }

    // -------------------------------
    // EDIT MODE
    // -------------------------------
    if (editingTask) {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === editingTask.id ? { ...t, title, category } : t
        )
      );

      toast.success("Task updated!");
      setEditingTask(null);
      return;
    }

    // -------------------------------
    // ADD MODE
    // -------------------------------
    const newTask: Task = {
      id: Date.now(),
      title,
      category,
      completed: false,
    };

    setTasks((prev) => [...prev, newTask]);
    toast.success("Task added!");
  };

  // =========================================================
  // TOGGLE TASK COMPLETION
  // =========================================================
  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  // =========================================================
  // DELETE TASK
  // =========================================================
  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    toast.info("Task deleted");
  };

  // =========================================================
  // EDIT TASK (set task into edit mode)
  // =========================================================
  const editTask = (task: Task) => {
    setEditingTask(task);
  };

  // =========================================================
  // FILTERED TASK LIST (memoized for performance)
  // =========================================================
  const filteredTasks = useMemo(() => {
    if (filter === "All") return tasks;
    return tasks.filter((t) => t.category === filter);
  }, [tasks, filter]);

  // =========================================================
  // CATEGORY COUNTS (for UI badges on filter buttons)
  // =========================================================
  const counts = {
    All: tasks.length,
    Work: tasks.filter((t) => t.category === "Work").length,
    Personal: tasks.filter((t) => t.category === "Personal").length,
    Study: tasks.filter((t) => t.category === "Study").length,
  };

  // =========================================================
  // PROGRESS CALCULATION
  // =========================================================
  const progress =
    tasks.length === 0
      ? 0
      : Math.round(
          (tasks.filter((t) => t.completed).length / tasks.length) * 100
        );

  // =========================================================
  // UI RENDER
  // =========================================================
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6 text-white">

      {/* Main Card Container */}
      <div className="w-full max-w-3xl h-[80vh] bg-gray-800 rounded-2xl shadow-2xl p-6 flex flex-col">

        {/* Toast notifications container */}
        <ToastContainer position="top-right" autoClose={2000} />

        {/* App Title */}
        <h1 className="text-3xl font-bold text-center mb-4">
          📝 Mini Task Tracker
        </h1>

        {/* Task Input Section */}
        <TaskInput onAdd={addOrUpdateTask} editTask={editingTask} />

        {/* Progress Bar */}
        <ProgressBar progress={progress} />

        {/* Filter Buttons */}
        <div className="flex gap-2 mb-4 flex-wrap">
          {["All", "Work", "Personal", "Study"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1 rounded-lg text-sm transition ${
                filter === cat
                  ? "bg-blue-500"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              {cat} ({counts[cat as keyof typeof counts]})
            </button>
          ))}
        </div>

        {/* Task List (Scrollable Area inside card) */}
        <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
          {filteredTasks.length === 0 ? (
            <p className="text-center text-gray-400 mt-6">
              No tasks added 😴
            </p>
          ) : (
            <TaskList
              tasks={filteredTasks}
              onToggle={toggleTask}
              onDelete={deleteTask}
              onEdit={editTask}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;