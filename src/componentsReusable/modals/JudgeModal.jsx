import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

import { runJudgeModal } from '../../redux/actions/appActions';

export default function JudgeModal({
  isShown,
  title,
  body,
  button1,
  button2,
  confirm,
}) {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  // TODO combine all modals into 1
  // TODO change all modals to use redux state like login modal
  useEffect(() => {
    if (isShown) setShow(true);
  }, [isShown]);

  const handleClose = async () => {
    await dispatch(runJudgeModal(''));
    setShow(false);
  };

  const handleClick = async () => {
    await handleClose();
    confirm();
  };

  return (
    <Modal className="modal" show={show} onHide={handleClose} centered>
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
  isShown: PropTypes.bool.isRequired,
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
