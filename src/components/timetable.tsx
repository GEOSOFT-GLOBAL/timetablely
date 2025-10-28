import * as React from "react";

interface TimeTableProps {
  propName?: string;
}

const TimeTable: React.FC<TimeTableProps> = ({ propName }) => {
  return (
    <div className="inline-block border-4 border-gray-600 rounded-lg overflow-hidden shadow-lg overflow-x-auto mb-8">
      <div className="bg-blue-600 text-white font-bold py-2 px-4 text-center">
        Master Timetable (All Classes)
      </div>
      <table className="border-collapse">
        <thead>
          <tr>
            <th className="bg-gray-300 border-2 border-gray-400 h-12 w-32 font-semibold text-gray-700 text-center sticky top-0 left-0 z-20">
              Time / Day
            </th>
            {/*{timeLabels.map(renderHeader)}*/}
          </tr>
        </thead>
        <tbody>
          {/*{Array.from({ length: gridSize }, (_, row) => (
            <tr key={row}>
              <td className="bg-gray-200 border-2 border-gray-400 h-16 w-32 font-semibold text-gray-700 text-center sticky left-0 z-10">
                <div className="flex items-center justify-center h-full">
                  // {/*{dayLabels[row]}
                </div>
              </td>
              {Array.from({ length: columnCount }, (_, col) =>
                renderCell(row, col),
              )}
            </tr>
          ))}*/}
        </tbody>
      </table>
    </div>
  );
};

export default TimeTable;
