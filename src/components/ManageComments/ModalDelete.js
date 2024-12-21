import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const ModalDelete = (props) => {
  return (
    <>
      <Modal show={props.show} onHide={props.handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Woohoo, you are sure to delete this comment id: {props.dataModal.id}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={props.confirmDeleteComment}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDelete;
