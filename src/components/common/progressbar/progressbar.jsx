import "./progressbar.scss";

function Progressbar({ timeData }) {
  const { title, value, time, configurations } = timeData;
  const { classNameList } = configurations;

  const styleData = {
    width: `${value}%`,
  };

  return (
    <div
      className={"row progress-container " + classNameList.join(" ")}
      data-align={configurations.titleAlignment}
    >
      <div
        className={configurations.titleAlignment === "row" ? "col-5" : "col-12"}
      >
        <div className="title-wrapper">
          {configurations.showLegends && <div className="legend-box"></div>}
          <div className="progress-title c-font-15">{title}</div>
        </div>
      </div>
      <div
        className={configurations.titleAlignment === "row" ? "col-7" : "col-12"}
      >
        <div className="progress-wrapper">
          <div
            className="progress custom-progressbar "
            role="progressbar"
            aria-label={title}
            aria-valuenow={value}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <div className="progress-bar" style={styleData}></div>
          </div>
          <div className="time-wrapper c-font-15">
            <span data-state={time.week > 0 ? "active" : "mute"}>
              {time.week}W :{" "}
            </span>
            <span data-state={time.day > 0 ? "active" : "mute"}>
              {time.day}D :{" "}
            </span>
            <span data-state={time.hour > 0 ? "active" : "mute"}>
              {time.hour}h :{" "}
            </span>
            <span data-state={time.minute > 0 ? "active" : "mute"}>
              {time.minute}m
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Progressbar;
