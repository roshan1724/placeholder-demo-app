import React from "react";
import PropTypes from "prop-types";

function SuccessModal({ title, subTitle, actionButtons }) {
  return (
    <div className="warn-modal-content">
      <h3 className="modal-title">{title}</h3>
      <p className="modal-subtitle">{subTitle}</p>

      <div className="modal-action-wrapper">
        {actionButtons.map((button, btnIndex) => (
          <button
            key={`warn-btn-${btnIndex}`}
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

SuccessModal.propTypes = {
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

export default SuccessModal;
