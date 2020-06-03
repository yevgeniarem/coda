import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

import { runSidebarModal } from '../../redux/actions/appActions';

export default function SidebarModal({
  title,
  body,
  button1,
  button2,
  confirm,
  cancel,
}) {
  const dispatch = useDispatch();
  const [show] = useSelector((state) => [state.modals.isSidebarModalShown]);

  const handleClose = () => {
    Promise.all([cancel(), dispatch(runSidebarModal(false))]);
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

SidebarModal.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  button1: PropTypes.string.isRequired,
  button2: PropTypes.string.isRequired,
  confirm: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
};
