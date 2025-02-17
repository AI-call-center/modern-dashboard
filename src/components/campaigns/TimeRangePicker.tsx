interface TimeRangePickerProps {
  startTime: string;
  endTime: string;
  onStartTimeChange: (time: string) => void;
  onEndTimeChange: (time: string) => void;
}

export default function TimeRangePicker({
  startTime,
  endTime,
  onStartTimeChange,
  onEndTimeChange
}: TimeRangePickerProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Time Range
      </label>
      <div className="grid grid-cols-2 gap-4">
        <div className="relative">
          <input
            type="time"
            value={startTime}
            onChange={(e) => onStartTimeChange(e.target.value)}
            className="w-full px-4 py-2 rounded-lg
              bg-white/80 dark:bg-navy-700/80
              text-gray-900 dark:text-white
              border border-gray-200/50 dark:border-gray-700/50
              focus:ring-2 focus:ring-primary-light/50 dark:focus:ring-primary-dark/50
              focus:border-transparent backdrop-blur-sm"
          />
        </div>
        <div className="relative">
          <input
            type="time"
            value={endTime}
            onChange={(e) => onEndTimeChange(e.target.value)}
            className="w-full px-4 py-2 rounded-lg
              bg-white/80 dark:bg-navy-700/80
              text-gray-900 dark:text-white
              border border-gray-200/50 dark:border-gray-700/50
              focus:ring-2 focus:ring-primary-light/50 dark:focus:ring-primary-dark/50
              focus:border-transparent backdrop-blur-sm"
          />
        </div>
      </div>
    </div>
  );
}
