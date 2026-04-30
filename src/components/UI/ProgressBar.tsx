
// Type Definition for Props
// This defines the shape of data the ProgressBar expects from parent component
type ProgressBarProps = {
  progress: number; // completion percentage (0 - 100)
};
// ProgressBar Component
// Visual indicator showing task completion progress
export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    // Wrapper container for spacing
    <div className="mb-4">

      {/* Header row: label + percentage */}
      <div className="flex justify-between text-sm text-gray-300 mb-1">
        <span>Progress</span>
        <span>{progress}%</span>
      </div>

      {/* Background bar (empty state) */}
      <div className="h-3 bg-gray-700 rounded-full overflow-hidden">

        {/* Foreground bar (filled progress) */}
        <div
          className="h-3 bg-green-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}