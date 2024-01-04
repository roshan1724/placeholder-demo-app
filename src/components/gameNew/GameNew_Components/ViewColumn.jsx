import CollectionsIcon from "@mui/icons-material/Collections";
import HighlightIcon from "@mui/icons-material/Highlight";

function ViewColumn({ status }) {
  return (
    <div className="view-wrapper">
      {status === "Finished" ? (
        <CollectionsIcon fontSize="small" />
      ) : status === "Ongoing" ? (
        <HighlightIcon fontSize="small" />
      ) : (
        ""
      )}
      <span className="view">
        {status === "Finished"
          ? "View Dashboard"
          : status === "Ongoing"
          ? "View Game"
          : ""}
      </span>
    </div>
  );
}

export default ViewColumn;
