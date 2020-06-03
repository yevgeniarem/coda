import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal as BootstrapModal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

import { runScoringBreakdownModal } from '../../redux/actions/appActions';

export default function Modal({
  title,
  body,
  button1,
  button2,
  cancel,
  confirm,
}) {
  const dispatch = useDispatch();
  const [show] = useSelector((state) => [
    state.modals.isScoringBreakdownModalShown,
  ]);

  const handleClose = () => {
    Promise.all([cancel(), dispatch(runScoringBreakdownModal(false))]);
  };

  const handleClick = async () => {
    await handleClose();
    confirm();
  };

  return (
    <BootstrapModal className="modal" show={show} onHide={handleClose} centered>
      <BootstrapModal.Header className="modal__header">
        <BootstrapModal.Title className="modal__title">
          {title}
        </BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body className="modal__body">{body}</BootstrapModal.Body>
      <BootstrapModal.Footer className="modal__footer">
        <Button
          variant="secondary"
          onClick={handleClose}
          className="button action-button--navigation action-button--grey"
        >
          {button1}
        </Button>
        <Button
          variant="secondary"
          onClick={handleClick}
          className="button action-button--navigation action-button--blue"
        >
          {button2}
        </Button>
      </BootstrapModal.Footer>
    </BootstrapModal>
  );
}

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  button1: PropTypes.string.isRequired,
  button2: PropTypes.string.isRequired,
  cancel: PropTypes.func.isRequired,
  confirm: PropTypes.func.isRequired,
};
