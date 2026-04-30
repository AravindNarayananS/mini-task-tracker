// Represents a single task in the task tracker application
// This type is used across components for consistency and type safety

export type Task = {
  // Unique identifier for each task (used for updates, delete, toggle)
  id: number;

  // Main task description entered by the user
  title: string;

  // Category used for filtering tasks (Work / Personal / Study)
  category: string;

  // Status flag to track whether the task is completed or not
  completed: boolean;
};