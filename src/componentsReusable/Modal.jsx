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
      modalInfo.cancel && modalInfo.cancel.func && modalInfo.cancel.func(),
    ]);
  };

  const handleClick = async () => {
    await dispatch(closeModal());
    if (modalInfo.confirm.func) modalInfo.confirm.func();
  };

  return (
    modalInfo && (
      <BootstrapModal
        className="modal"
        show={isModalShown}
        onHide={handleClose}
        centered
      >
        <BootstrapModal.Header className="modal__header">
          <BootstrapModal.Title className="modal__title">
            {modalInfo.title}
          </BootstrapModal.Title>
        </BootstrapModal.Header>
        <BootstrapModal.Body className="modal__body">
          {modalInfo.body}
        </BootstrapModal.Body>
        <BootstrapModal.Footer className="modal__footer">
          {modalInfo.cancel && (
            <Button
              onClick={handleClose}
              className="button action-button--navigation action-button--grey"
            >
              {modalInfo.cancel.text}
            </Button>
          )}
          <Button
            onClick={handleClick}
            className="button action-button--navigation action-button--blue"
          >
            {modalInfo.confirm.text}
          </Button>
        </BootstrapModal.Footer>
      </BootstrapModal>
    )
  );
}
