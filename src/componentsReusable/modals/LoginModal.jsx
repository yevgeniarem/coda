import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

import { runLoginModal } from '../../redux/actions/appActions';

export default function LoginModal({ title, body, button1 }) {
  const dispatch = useDispatch();
  const [show] = useSelector((state) => [state.modals.isLoginModalShown]);

  const handleClick = () => {
    dispatch(runLoginModal(false));
  };

  return (
    <Modal className="modal" show={show} onHide={handleClick} centered>
      <Modal.Header className="modal__header">
        <Modal.Title className="modal__title">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal__body">{body}</Modal.Body>
      <Modal.Footer className="modal__footer">
        <Button
          onClick={handleClick}
          className="button action-button--navigation action-button--blue"
        >
          {button1}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

LoginModal.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  button1: PropTypes.string.isRequired,
};
