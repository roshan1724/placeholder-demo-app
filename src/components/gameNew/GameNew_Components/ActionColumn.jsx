import React from "react";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import FileCopyIcon from "@mui/icons-material/FileCopy";

function ActionColumn({ status }) {
  return (
    <div className="view-wrapper">
      {status === "Finished" ? (
        <FileCopyIcon fontSize="small" />
      ) : status === "Ongoing" ? (
        <RestartAltIcon fontSize="small" />
      ) : (
        <EditCalendarIcon fontSize="small" />
      )}
      <span className="view">
        {status === "Finished"
          ? "Duplicate"
          : status === "Ongoing"
          ? "Restart"
          : "Edit/Reschedule"}
      </span>
    </div>
  );
}

export default ActionColumn;
