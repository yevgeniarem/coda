import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal as BootstrapModal, Button } from 'react-bootstrap';

import { closeModal } from '../redux/actions/appActions';

export default function Modal() {
  const dispatch = useDispatch();
  const { isModalShown, modalInfo } = useSelector((state) => state.modals);

  const handleClose = async () => {
    Promise.all([
      dispatch(closeModal()),
      modalInfo.cancel && modalInfo.cancel(),
    ]);
  };

  const handleClick = async () => {
    await handleClose();
    if (modalInfo.confirm) modalInfo.confirm();
  };

  return (
    <BootstrapModal
      className="modal"
      show={isModalShown}
      onHide={handleClose}
      centered
    >
      <BootstrapModal.Header className="modal__header">
        <BootstrapModal.Title className="modal__title">
          {modalInfo && modalInfo.title}
        </BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body className="modal__body">
        {modalInfo && modalInfo.body}
      </BootstrapModal.Body>
      <BootstrapModal.Footer className="modal__footer">
        {modalInfo && modalInfo.button1 && (
          <Button
            onClick={handleClose}
            className="button action-button--navigation action-button--grey"
          >
            {modalInfo && modalInfo.button1}
          </Button>
        )}
        <Button
          onClick={handleClick}
          className="button action-button--navigation action-button--blue"
        >
          {modalInfo && modalInfo.button2}
        </Button>
      </BootstrapModal.Footer>
    </BootstrapModal>
  );
}
