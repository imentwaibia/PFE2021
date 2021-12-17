import React from "react";
import { Card,Button } from "react-bootstrap";
import { Authcontext } from "../../../context/auth-context";
import { useContext } from "react";
import "../Sections/Jardin.css";
 
const Jardin = ({jardin}) => {
  const auth = useContext(Authcontext);
    return (
      
        <div>
           { (jardin.nom) === "admin" ? null : ( 
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
        </div> )}
        </div>
    )
}

export default Jardin
