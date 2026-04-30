// ================================
// Props Definition
// ================================
// current → currently selected filter
// setFilter → function to update selected filter
type Props = {
  current: string;
  setFilter: (value: string) => void;
};

// ================================
// Available Filter Options
// ================================
// Static list of task categories used for filtering
const filters = ["All", "Work", "Personal", "Study"];

// ================================
// FilterButtons Component
// ================================
// Renders category filter buttons to switch task views
export default function FilterButtons({
  current,
  setFilter,
}: Props) {

  return (
    // =========================================================
    // Button Container
    // =========================================================
    <div className="flex gap-2 mt-4">

      {/* Loop through all filter categories */}
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => setFilter(f)} // update selected filter
          
          // =====================================================
          // Dynamic Styling:
          // - Active filter → highlighted
          // - Inactive → muted gray with hover effect
          // =====================================================
          className={`px-3 py-1 rounded-lg text-sm transition ${
            current === f
              ? "bg-purple-600 text-white"
              : "bg-gray-800 text-gray-300 hover:bg-gray-700"
          }`}
        >
          {f}
        </button>
      ))}
    </div>
  );
}