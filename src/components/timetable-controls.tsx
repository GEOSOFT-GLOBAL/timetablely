import * as React from "react";

interface TimetableControlsProps {
  handleGenerateAutomatedTimetableWithAlert?: () => void;
  handleClearTimetable?: () => void;
  handleExportPDF?: () => void;
  databaseClasses?: Array<{ id: string; name: string }>;
  expandedClasses: Record<string, boolean>;
  setExpandedClasses: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
}

const TimetableControls: React.FC<TimetableControlsProps> = ({
  handleGenerateAutomatedTimetableWithAlert,
  handleClearTimetable,
  handleExportPDF,
  databaseClasses,
  expandedClasses,
  setExpandedClasses,
}) => {
  return (
    <div className="flex flex-col gap-2 mb-4">
      <div className="flex gap-2 items-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-none"
          onClick={handleGenerateAutomatedTimetableWithAlert}
        >
          Generate All Timetables
        </button>
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-none"
          onClick={handleClearTimetable}
        >
          Clear Timetable
        </button>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-none"
          onClick={handleExportPDF}
        >
          Export as PDF
        </button>
      </div>

      {databaseClasses && databaseClasses?.length > 0 && (
        <div className="flex items-center gap-2 mt-2">
          <span className="font-medium">Toggle class timetables:</span>
          {databaseClasses.map((cls) => (
            <button
              key={cls.id}
              className={`px-3 py-1 rounded-none text-sm ${expandedClasses![cls.id] ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"}`}
              onClick={() =>
                setExpandedClasses((prev) => ({
                  ...prev,
                  [cls.id]: !prev[cls.id],
                }))
              }
            >
              {cls.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TimetableControls;
