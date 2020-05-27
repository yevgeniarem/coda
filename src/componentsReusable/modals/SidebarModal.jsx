import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

import {
  runSidebarModal,
  updateCurrentRoutine,
  closeSidebar,
  resetScoring,
} from '../../redux/actions/appActions';

export default function SidebarModal({
  isShown,
  title,
  body,
  button1,
  button2,
  clickedRoutine,
}) {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isShown) setShow(true);
  }, [isShown]);

  const handleClose = async () => {
    await Promise.all([
      dispatch(closeSidebar()),
      dispatch(runSidebarModal(false)),
    ]);
    setShow(false);
  };

  const handleClick = async () => {
    await dispatch(updateCurrentRoutine(clickedRoutine));
    Promise.all([handleClose(), dispatch(resetScoring())]);
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
  isShown: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  button1: PropTypes.string.isRequired,
  button2: PropTypes.string.isRequired,
  clickedRoutine: PropTypes.shape({}).isRequired,
};
