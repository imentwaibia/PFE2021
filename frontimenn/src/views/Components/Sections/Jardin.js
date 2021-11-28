import React from "react";
import { Card,Button } from "react-bootstrap";
//import { useSelector } from "react-redux";
import "../Sections/Jardin.css";
const Jardin = ({jardin}) => {
    return (
        <div>
            <Card className="jardin">
        <Card.Body>
          <Card.Title className="Title">{jardin.nom}</Card.Title>
          <Card.Text>{jardin.email}</Card.Text>
          <Card.Text>{jardin.adresse}</Card.Text>
          <Card.Text>{jardin.tel}</Card.Text>
          <Card.Text>{jardin.description}</Card.Text>

          
        </Card.Body>
      </Card>
        </div>
    )
}

export default Jardin
