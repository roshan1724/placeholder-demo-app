import React from "react";

function StartDateTimeColumn({ startDate, startTime }) {
  return (
    <div className="startDate_Time">
      <span>
        {startDate}, {startTime}
      </span>
    </div>
  );
}

export default StartDateTimeColumn;
