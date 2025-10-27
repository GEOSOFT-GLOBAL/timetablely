import * as React from "react";

interface SessionTimeTableProps {
  propName: type;
}

const SessionTimeTable: React.FC<SessionTimeTableProps> = ({ propName }) => {
  return (
    <div>
      <div className="session-time-table">
        <div className="session-time-table-header">
          <div className="session-time-table-header-item">Time</div>
          <div className="session-time-table-header-item">Title</div>
          <div className="session-time-table-header-item">Speaker</div>
        </div>
        <div className="session-time-table-body">
          <div className="session-time-table-row">
            <div className="session-time-table-row-item">9:00 AM</div>
            <div className="session-time-table-row-item">Welcome</div>
            <div className="session-time-table-row-item">Tim Cook</div>
          </div>
          <div className="session-time-table-row">
            <div className="session-time-table-row-item">9:30 AM</div>
            <div className="session-time-table-row-item">Keynote</div>
            <div className="session-time-table-row-item">Steve Jobs</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionTimeTable;
