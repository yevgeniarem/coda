import React from 'react';
import { useDispatch, useState } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { handleModalClose } from '../redux/actions/appActions';

const ModalComponent = ({ isShown, title, body, numButtons, button1 }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(isShown);
  const handleClose = () => setShow(false);

  const renderButtons = () => {
    if (numButtons === '1')
      return (
        <Button
          variant="secondary"
          onClick={() => dispatch(handleModalClose())}
          className="button action-button--navigation action-button--blue"
        >
          {button1}
        </Button>
      );
  };

  return (
    <Modal
      className="modal"
      show={show}
      onHide={() => dispatch(handleModalClose())}
      centered
    >
      <Modal.Header className="modal__header">
        <Modal.Title className="modal__title">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal__body">{body}</Modal.Body>
      <Modal.Footer className="modal__footer">{renderButtons()}</Modal.Footer>
    </Modal>
  );
};

export default ModalComponent;
