
// Types
import type { Task } from "../../types/Task";

// Props Definition
// tasks → list of tasks to display
// onToggle → toggle completion status
// onDelete → delete task handler
// onEdit → send task to edit mode
interface Props {
  tasks: Task[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (task: Task) => void;
}

// TaskList Component
// Renders list of tasks with actions:
// - Complete / uncomplete
// - Edit task
// - Delete task
export default function TaskList({
  tasks,
  onToggle,
  onDelete,
  onEdit,
}: Props) {

  return (
    // =========================================================
    // Task List Container
    // =========================================================
    <ul className="space-y-3">

      {/* Loop through tasks array */}
      {tasks.map((task) => (
        <li
          key={task.id}
          className="flex items-center justify-between bg-gray-800 text-white p-3 rounded-lg shadow"
        >

          {/* =====================================================
              LEFT SECTION: Checkbox + Task Title
          ===================================================== */}
          <div className="flex items-center gap-3 flex-1 min-w-0">

            {/* Toggle completion checkbox */}
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggle(task.id)}
              className="w-4 h-4"
            />

            {/* Task Title (with truncation + tooltip) */}
            <span
              title={task.title}
              className={`truncate ${
                task.completed ? "line-through text-gray-400" : ""
              }`}
            >
              {task.title}
            </span>
          </div>

          {/* =====================================================
              RIGHT SECTION: Category + Actions
          ===================================================== */}
          <div className="flex items-center gap-2 ml-3">

            {/* Category Badge */}
            <span className="text-xs px-2 py-1 rounded-full bg-gray-700 text-gray-200 whitespace-nowrap">
              {task.category}
            </span>

            {/* Edit Button (icon-based action) */}
            <button
              onClick={() => onEdit(task)}
              className="p-1 rounded hover:bg-yellow-500/20"
              title="Edit"
            >
              ✏️
            </button>

            {/* Delete Button (icon-based action) */}
            <button
              onClick={() => onDelete(task.id)}
              className="p-1 rounded hover:bg-red-500/20"
              title="Delete"
            >
              🗑️
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}