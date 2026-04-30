
// Testing Library Imports
import {
  render,
  screen,
  fireEvent,
  cleanup,
} from "@testing-library/react";

// Vitest Utilities
import { describe, test, expect, afterEach, beforeEach } from "vitest";

// Main App Component Under Test
import App from "../App";
// GLOBAL TEST SETUP

// Clear localStorage before each test
// Ensures test isolation (no shared state between tests)
beforeEach(() => {
  localStorage.clear();
});

// Cleanup DOM after each test to avoid memory leaks
afterEach(() => {
  cleanup();
});

// =========================================================
// TEST SUITE: Task Tracker App
// =========================================================
describe("App - Task Tracker", () => {

  // =======================================================
  // TEST 1: Add Task
  // =======================================================
  test("adds a task and displays it", () => {
    render(<App />);

    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button", { name: /add/i });

    fireEvent.change(input, { target: { value: "Test Task" } });
    fireEvent.click(button);

    // Verify task appears in UI
    expect(screen.getByText(/Test Task/i)).toBeInTheDocument();
  });

  // =======================================================
  // TEST 2: Toggle Task Completion
  // =======================================================
  test("toggles task completion", () => {
    render(<App />);

    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button", { name: /add/i });

    fireEvent.change(input, { target: { value: "Toggle Task" } });
    fireEvent.click(button);

    // Find task container (list item)
    const taskItem = screen.getByText(/Toggle Task/i).closest("li");

    // Get checkbox inside task item
    const checkbox = taskItem?.querySelector(
      "input[type='checkbox']"
    ) as HTMLInputElement;

    // Initial state: unchecked
    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);

    // After toggle: checked
    expect(checkbox).toBeChecked();
  });

  // =======================================================
  // TEST 3: Delete Task
  // =======================================================
  test("deletes a task", () => {
    render(<App />);

    const input = screen.getByRole("textbox");
    const addButton = screen.getByRole("button", { name: /add/i });

    fireEvent.change(input, { target: { value: "Delete Task" } });
    fireEvent.click(addButton);

    const taskItem = screen.getByText(/Delete Task/i).closest("li");

    // Find delete button via title attribute
    const deleteButton = taskItem?.querySelector(
      "button[title='Delete']"
    ) as HTMLButtonElement;

    fireEvent.click(deleteButton);

    // Task should no longer exist in DOM
    expect(screen.queryByText(/Delete Task/i)).not.toBeInTheDocument();
  });

  // =======================================================
  // TEST 4: Edit Task
  // =======================================================
  test("edits a task", () => {
    render(<App />);

    const input = screen.getByRole("textbox");
    const addButton = screen.getByRole("button", { name: /add/i });

    // Create initial task
    fireEvent.change(input, { target: { value: "Old Task" } });
    fireEvent.click(addButton);

    const taskItem = screen.getByText(/Old Task/i).closest("li");

    // Click edit icon
    const editButton = taskItem?.querySelector(
      "button[title='Edit']"
    ) as HTMLButtonElement;

    fireEvent.click(editButton);

    // Modify input value
    const updatedInput = screen.getByRole("textbox");

    fireEvent.change(updatedInput, {
      target: { value: "Updated Task" },
    });

    fireEvent.click(addButton);

    // Verify update
    expect(screen.getByText(/Updated Task/i)).toBeInTheDocument();
    expect(screen.queryByText(/Old Task/i)).not.toBeInTheDocument();
  });

  // =======================================================
  // TEST 5: LocalStorage Persistence
  // =======================================================
  test("persists tasks in localStorage after reload", () => {
    const { unmount } = render(<App />);

    const input = screen.getByRole("textbox");
    const addButton = screen.getByRole("button", { name: /add/i });

    fireEvent.change(input, { target: { value: "Persist Task" } });
    fireEvent.click(addButton);

    // Simulate page refresh by unmounting component
    unmount();

    // Re-render app (like reload)
    render(<App />);

    // Task should still exist due to localStorage
    expect(screen.getByText(/Persist Task/i)).toBeInTheDocument();
  });
});