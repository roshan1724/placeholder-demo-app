import "./Buttons.scss";
import React, { useId } from "react";
import PropTypes from "prop-types";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

function FeedbackButton(props) {
  const tooltipId = useId();

  return (
    <OverlayTrigger
      delay={{ show: 250, hide: 400 }}
      overlay={
        <Tooltip
          id={`tooltip-${tooltipId}`}
          className={props.feedbackTooltipClass}
        >
          {props.tooltipText}
        </Tooltip>
      }
    >
      <button
        className={`${props.className?.join(" ")}`}
        onClick={props.clickHandler}
      >
        {props.children}
      </button>
    </OverlayTrigger>
  );
}

FeedbackButton.propTypes = {
  className: PropTypes.arrayOf(PropTypes.string).isRequired,
  clickHandler: PropTypes.func.isRequired,
  feedbackTooltipClass: PropTypes.string,
  tooltipText: PropTypes.string.isRequired,
};

export default FeedbackButton;
