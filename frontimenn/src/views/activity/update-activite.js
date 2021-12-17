import React, { useState, useContext, useEffect, useRef } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import { Form, Image } from "react-bootstrap";
import styles from "assets/jss/material-kit-react/views/loginPage.js";
import image from "assets/img/img6.jpg";
import { Authcontext } from "../../context/auth-context";
import ErrorModel from "../../models/error-model";
import SuccessModel from "../../models/success-model";
import { useParams } from "react-router-dom";
import axios from "axios";

const useStyles = makeStyles(styles);

export default function UpdateActivity(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  

  const [File, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);
  
  const filePickerRef = useRef();

 

  const pickedHandler = (event) => {
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    
  };
  const pickImageHandler = (event) => {
    filePickerRef.current.click();
  };

  const [titre, setTitre] = useState();
  const [type, setType] = useState();
  const [description, setDescription] = useState();
  const [error, seterror] = useState(null);
  const [success, setsuccess] = useState(null);
  useEffect(() => {
    const sendRequest = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/activity/activity/${id}`
        );

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setTitre(responseData.existingActivity.titre);
        setType(responseData.existingActivity.type);
        setDescription(responseData.existingActivity.description);
      } catch (err) {
        seterror(err.message);
      }
    };

    sendRequest();
  }, []);

  const onchange = (e) => {
    if (e.target.name === "titre") {
      setTitre(e.target.value);
    } else if (e.target.name === "type") {
      setType(e.target.value);
    } else if (e.target.name === "description") {
      setDescription(e.target.value);
    }
  };
  const id = useParams().id;
  const submit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", File);
    formData.append("titre", titre);
    formData.append("type", type);
    formData.append("description", description);
    try {
      await axios.patch(`http://localhost:5000/api/activity/${id}`, formData) ;
      setsuccess("activité modifié.");
      seterror(null)
    } catch (err) {
      
      seterror(err.message || "probleme!!");
    }
  };

 

  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <Header
        absolute
        color="transparent"
        brand="Happy Kids"
        rightLinks={<HeaderLinks />}
        {...rest}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={8}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form} onSubmit={submit}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Modifier Activité</h4>
                   
                  </CardHeader>
                  <ErrorModel error={error} />
                  <SuccessModel success={success} />
                  <p className={classes.divider}></p>
                  <CardBody>
                    <div
                      style={{
                        width: "50%",
                        marginBottom: "30px",
                        marginTop: "20px",
                      }}
                    >
                      <input
                        ref={filePickerRef}
                        style={{ display: "none" }}
                        type="file"
                        accept=".jpg,.png,.jpeg"
                        onChange={pickedHandler}
                      />
                      <div>
                        {previewUrl && (
                          <Image
                            src={previewUrl}
                            alt="Preview"
                            rounded
                            style={{ width: "100%", height: "100%" }}
                          />
                        )}

                        
                      </div>
                      {!isValid && <p></p>}
                    </div>
                    <Form.Label>Titre</Form.Label>
                    <CustomInput
                     
                      id="first"
                      name="titre"
                      value={titre}
                      required
                      onChange={onchange}
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <People className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <Form.Label>Type</Form.Label>
                    <CustomInput
                     
                      id="first"
                      name="type"
                      value={type}
                      required
                      onChange={onchange}
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <People className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                    />

                    <Form.Group controlId="exampleForm.ControlTextarea1">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        value={description}
                        rows={5}
                        name="description"
                        onChange={onchange}
                        required
                      />
                    </Form.Group>
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button simple color="primary" size="lg" type="submit">
                      Modifier
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}
