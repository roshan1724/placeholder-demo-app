import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import PropTypes from 'prop-types';
import { createPortal } from "react-dom";
import { APP_MODAL_TYPES, MODALVIEW_CONTAINER } from "../../../utilities/constants";
import ErrorModal from "./ErrorModal/error-modal";
import "./modal.scss";
import { useSelector } from "react-redux";
import bootstrap from "bootstrap/dist/js/bootstrap";

function AppModal({modalType, modalData, modalBodyClass, handleModalClose}) {

  const [modalComponent, setModalComponent] = useState(null);
  const [appModal, setAppModal] = useState(new bootstrap.Modal(document.getElementById('custom-modal'), {
    backdrop: true,
    keyboard: true,
    focus: true
  }));
  const modalContainerElement = document.getElementById(MODALVIEW_CONTAINER);
  
  const showModal = useSelector((state) => state.ui.showModal);
  // console.log('Modal state ==> ', showModal);

  useEffect(() => {
    if (showModal) {
      console.log('SHOW Enabled Modal...', appModal);
      appModal.show();
    } else {
      console.log('SHOW Disabled Modal...');
      appModal.hide();
    }
  }, [showModal, appModal]);

  if (modalType === APP_MODAL_TYPES.ERROR) {    
    setModalComponent(React.createElement(ErrorModal, {
      title: modalData.title,
      subTitle: modalData.subTitle,
      actionButtons: modalData.actionButtons
    }));
  }

  // let modalBody = createPortal(modalComponent, modalContainerElement);

  return ( appModal &&
    <div className="modal fade" id="custom-modal" tabIndex="-1" aria-label="app modal" aria-hidden="true">
      <div className={`modal-dialog modal-dialog-centered ${modalBodyClass}`}>
        <div className="modal-content app-modal-content">
          <span type="button" className="close-btn" data-bs-dismiss="modal" aria-label="Close" onClick={handleModalClose}>
            <img src="/images/circle_cross_grey.png" alt="Close Icon" width={30} height={30}/>
          </span>
          <div className="modal-body">
            {
              modalComponent
            }
          </div>
        </div>
      </div>
    </div>
   );
}

AppModal.propTypes = {
  modalType: PropTypes.string.isRequired,
  modalData: PropTypes.exact({
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string.isRequired,
    actionButtons: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string,
      classNames: PropTypes.array,
      clickHandler: PropTypes.func
    })).isRequired
  }),
  modalBodyClass: PropTypes.arrayOf(PropTypes.string),
  handleModalClose: PropTypes.func.isRequired
};

export default AppModal;