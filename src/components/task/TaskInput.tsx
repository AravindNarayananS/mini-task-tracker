// React Hooks
import { useEffect, useRef, useState } from "react";
// Types
import type { Task } from "../../types/Task";
// Props Definition
interface Props {
  onAdd: (title: string, category: string) => void;
  editTask: Task | null;
}

// TaskInput Component
// Handles:
// - Creating new tasks
// - Editing existing tasks
// - Keyboard + button submission UX
export default function TaskInput({ onAdd, editTask }: Props) {

  // =========================================================
  // Local State: Form fields
  // =========================================================
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Work");

  // =========================================================
  // Ref: For auto-focus after submit
  // =========================================================
  const inputRef = useRef<HTMLInputElement>(null);

  // =========================================================
  // Effect: Populate form when editing a task
  // =========================================================
  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title);
      setCategory(editTask.category);
    }
  }, [editTask]);

  // =========================================================
  // Handle Submit (supports Enter key + button click)
  // =========================================================
  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault(); // prevents page reload on Enter

    // Prevent empty task creation
    if (!title.trim()) return;

    onAdd(title, category);

    // Reset only title (keeps UX smooth for repeated entries)
    setTitle("");

    // Refocus input after submit for fast task entry
    inputRef.current?.focus();
  };

  // =========================================================
  // UI Render
  // =========================================================
  return (
    // FORM enables Enter key submission automatically
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">

      {/* Task Title Input */}
      <input
        ref={inputRef}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task"
        className="flex-1 px-3 py-2 rounded-lg bg-gray-700 text-white"
      />

      {/* Category Selector */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="px-2 py-2 bg-gray-700 rounded-lg"
      >
        <option>Work</option>
        <option>Personal</option>
        <option>Study</option>
      </select>

      {/* Submit Button (Add / Update mode) */}
      <button
        type="submit"
        className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg"
      >
        {editTask ? "Update" : "Add"}
      </button>

    </form>
  );
}