import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

import { runJudgeModal } from '../../redux/actions/appActions';

export default function JudgeModal({ title, body, button1, button2, confirm }) {
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
    <Modal className="modal" show={Boolean(show)} onHide={handleClose} centered>
      <Modal.Header className="modal__header">
        <Modal.Title className="modal__title">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal__body">{body}</Modal.Body>
      <Modal.Footer className="modal__footer">
        <Button
          onClick={handleClose}
          className="button action-button--navigation action-button--grey"
        >
          {button1}
        </Button>
        <Button
          onClick={handleClick}
          className="button action-button--navigation action-button--blue"
        >
          {button2}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

JudgeModal.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string,
  button1: PropTypes.string.isRequired,
  button2: PropTypes.string.isRequired,
  confirm: PropTypes.func,
};

JudgeModal.defaultProps = {
  body: null,
  confirm: null,
};
