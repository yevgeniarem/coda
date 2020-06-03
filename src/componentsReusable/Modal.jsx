import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal as BootstrapModal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

import { runJudgeModal } from '../redux/actions/appActions';

export default function Modal({ title, body, button1, button2, confirm }) {
  const dispatch = useDispatch();
  const [show] = useSelector((state) => [state.modals.judgeName]);

  const handleClose = () => {
    dispatch(runJudgeModal(''));
  };

  const handleClick = async () => {
    await handleClose();
    confirm();
  };

  return (
    <BootstrapModal
      className="modal"
      show={Boolean(show)}
      onHide={handleClose}
      centered
    >
      <BootstrapModal.Header className="modal__header">
        <BootstrapModal.Title className="modal__title">
          {title}
        </BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body className="modal__body">{body}</BootstrapModal.Body>
      <BootstrapModal.Footer className="modal__footer">
        {button2 && (
          <Button
            onClick={handleClose}
            className="button action-button--navigation action-button--grey"
          >
            {button1}
          </Button>
        )}
        <Button
          onClick={handleClick}
          className="button action-button--navigation action-button--blue"
        >
          {button2}
        </Button>
        )
      </BootstrapModal.Footer>
    </BootstrapModal>
  );
}

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string,
  button1: PropTypes.string.isRequired,
  button2: PropTypes.string,
  confirm: PropTypes.func,
};

Modal.defaultProps = {
  body: null,
  confirm: null,
  button2: null,
};
