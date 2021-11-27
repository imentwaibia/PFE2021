import React, { useState,useEffect } from "react";
import { Modal } from "react-bootstrap";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import Button from "@material-ui/core/Button";

function MyVerticallyCenteredModal(props) {
  const [parent, setParent] = useState();
  const [error, seterror] = useState(null);
  const [success, setsuccess] = useState(null);
  useEffect(() => {
    const sendRequest = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/parent/${props.parentId}`
        );

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setParent(responseData.existingParent);
      } catch (err) {
        seterror(err.message);
      }
    };

    sendRequest();
  }, []);
  console.log(parent)
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Parents info
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>{parent && parent.nom + " "+ parent.prenom}</h4>
        <h4>{parent && "Email: "+parent.email + " Tel: "+ parent.tel}</h4>
        <p>
          {parent && "adresse: "+parent.adresse}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Fermer</Button>
      </Modal.Footer>
    </Modal>
  );
}

function GetParent(props) {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => setModalShow(true)}
      >
        <AssignmentIndIcon style={{ color: "blue" }} />
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        parentId={props.parentId}
      />
    </>
  );
}

export default GetParent;
