import "./modal.scss";
import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import { APP_MODAL_TYPES } from "../../../utilities/constants";
import ErrorModal from "./error-modal";
import InfoModal from "./info-modal";
import SuccessModal from "./success-modal";

const getModalComponent = (modalType, modalData) => {
  if (modalType === APP_MODAL_TYPES.ERROR) {
    return React.createElement(ErrorModal, {
      title: modalData.title,
      subTitle: modalData.subTitle,
      actionButtons: modalData.actionButtons,
    });
  } else if (modalType === APP_MODAL_TYPES.INFO) {
    return React.createElement(InfoModal, {
      title: modalData.title,
      subTitle: modalData.subTitle,
      actionButtons: modalData.actionButtons,
    });
  } else if (modalType === APP_MODAL_TYPES.SUCCESS) {
    return React.createElement(SuccessModal, {
      title: modalData.title,
      subTitle: modalData.subTitle,
      actionButtons: modalData.actionButtons,
    });
  } else {
    return null;
  }
};
function AppModal({ modalType, modalData, modalBodyClass, handleModalClose }) {
  const showModal = useSelector((state) => state.ui.showModal);
  const modalComponent = getModalComponent(modalType, modalData);

  return (
    <Fragment>
      <Modal show={showModal} onHide={handleModalClose} centered>
        <span
          type="button"
          className="close-btn"
          aria-label="Close"
          onClick={handleModalClose}
        >
          <img
            src="/images/circle_cross_grey.png"
            alt="Close Icon"
            width={25}
            height={25}
          />
        </span>
        <Modal.Body>{modalComponent}</Modal.Body>
      </Modal>
    </Fragment>
  );
}

AppModal.propTypes = {
  modalType: PropTypes.string.isRequired,
  modalData: PropTypes.exact({
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string.isRequired,
    actionButtons: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string,
        classNames: PropTypes.array,
        clickHandler: PropTypes.func,
      })
    ).isRequired,
  }),
  modalBodyClass: PropTypes.arrayOf(PropTypes.string),
  handleModalClose: PropTypes.func.isRequired,
};

export default AppModal;
