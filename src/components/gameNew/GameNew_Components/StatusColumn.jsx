import React from "react";
import CachedIcon from "@mui/icons-material/Cached";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

function StatusColumn({ status }) {
  return (
    <div
      className={`status-wrapper ${
        status === "Finished" ? "status-success" : "notSuccess"
      }`}
    >
      {status === "Finished" ? (
        <CheckCircleIcon fontSize="small" />
      ) : status === "Scheduled" ? (
        <AccessTimeFilledIcon fontSize="small" />
      ) : (
        <CachedIcon fontSize="small" />
      )}
      <span className="status-info">{status}</span>
    </div>
  );
}

export default StatusColumn;
