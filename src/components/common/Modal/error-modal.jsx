import "./modal.scss";
import React from "react";
import PropTypes from "prop-types";

function ErrorModal({ title, subTitle, actionButtons }) {
  return (
    <div className="error-modal-content">
      <h3 className="modal-title">
        <span className="icon-wrapper me-2">
          <i className="fa-solid fa-triangle-exclamation"></i>
        </span>
        {title}
      </h3>
      <p className="modal-subtitle">{subTitle}</p>

      <div className="modal-action-wrapper">
        {actionButtons.map((button, btnIndex) => (
          <button
            key={`error-btn-${btnIndex}`}
            className={`btn ${button.classNames.join(" ")}`}
            onClick={button.clickHandler}
          >
            {button.text}
          </button>
        ))}
      </div>
    </div>
  );
}

ErrorModal.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  actionButtons: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      classNames: PropTypes.array,
      clickHandler: PropTypes.func,
    })
  ).isRequired,
};

export default ErrorModal;
