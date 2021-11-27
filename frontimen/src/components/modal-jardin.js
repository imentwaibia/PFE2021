import React, { useState,useEffect } from "react";
import { Modal } from "react-bootstrap";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import Button from "@material-ui/core/Button";

function MyVerticallyCenteredModal(props) {
  const [jardin, setJardin] = useState();
  const [error, seterror] = useState(null);
  const [success, setsuccess] = useState(null);
  useEffect(() => {
    const sendRequest = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/jardin/${props.id}`
        );

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setJardin(responseData.existingJardin);
      } catch (err) {
        seterror(err.message);
      }
    };

    sendRequest();
  }, []);
  console.log(props.id)
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Jardin info
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>{jardin && jardin.nom }</h4>
        <h4>{jardin && "Email: "+jardin.email + " Tel: "+ jardin.tel}</h4>
        <p>
          {jardin && "adresse: "+jardin.adresse}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Fermer</Button>
      </Modal.Footer>
    </Modal>
  );
}

function ModelJardin(props) {
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
        id={props.id}
      />
    </>
  );
}

export default ModelJardin;
