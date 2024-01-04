import React from "react";
import EmailIcon from "@mui/icons-material/Email";
import PhishingIcon from "@mui/icons-material/Phishing";
import BugReportIcon from "@mui/icons-material/BugReport";

function GameColumn({ gameName }) {
  return (
    <div className="gameName-wrapper">
      <span className="gameName-icon">
        {gameName === "Email Compromise" ? (
          <EmailIcon fontSize="small" />
        ) : gameName === "Malicious Insider" ? (
          <BugReportIcon fontSize="small" />
        ) : (
          <PhishingIcon fontSize="small" />
        )}
      </span>

      <span className="gameName">{gameName}</span>
    </div>
  );
}

export default GameColumn;
