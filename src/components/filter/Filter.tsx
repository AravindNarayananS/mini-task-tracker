// Props definition for the Filter component
// - current: currently selected filter value
// - setFilter: function to update selected filter state
type Props = {
  current: string;
  setFilter: (value: string) => void;
};

// Filter component allows user to filter tasks by category
export default function Filter({ current, setFilter }: Props) {
  return (
    <div className="flex items-center gap-3">
      {/* Label for filter dropdown */}
      <span className="text-gray-300">Filter:</span>

      {/* Dropdown to select task category filter */}
      <select
        className="p-2 rounded-lg bg-gray-800 text-white border border-gray-600"
        value={current}
        onChange={(e) => setFilter(e.target.value)}
      >
        {/* Show all tasks */}
        <option>All</option>

        {/* Filter only work-related tasks */}
        <option>Work</option>

        {/* Filter only personal tasks */}
        <option>Personal</option>

        {/* Filter only study-related tasks */}
        <option>Study</option>
      </select>
    </div>
  );
}