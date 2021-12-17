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
import { Link } from "react-router-dom";

import styles from "assets/jss/material-kit-react/views/loginPage.js";

import image from "assets/img/img1.jpg";
import { Authcontext } from "../../context/auth-context";
import ErrorModel from "../../models/error-model";
import SuccessModel from "../../models/success-model";
import axios from "axios";

const useStyles = makeStyles(styles);

export default function SignupPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);

  const [File, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  const filePickerRef = useRef();

  useEffect(() => {
    if (!File) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };

    fileReader.readAsDataURL(File);
  }, [File]);

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
    /* props.onInput(props.id, pickedFile, fileIsValid); */
  };

  const pickImageHandler = (event) => {
    filePickerRef.current.click();
  };

  const [nom, setNom] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [adresse, setAdresse] = useState();
  const [tel, setTel] = useState();
  const [date, setDate] = useState();
  const [description, setDescription] = useState();
  const [error, seterror] = useState(null);
  const [success, setsuccess] = useState(null);

  const onchange = (e) => {
    if (e.target.name === "nom") {
      setNom(e.target.value);
    } else if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    } else if (e.target.name === "adresse") {
      setAdresse(e.target.value);
    } else if (e.target.name === "tel") {
      setTel(e.target.value);
    } else if (e.target.name === "date") {
      setDate(e.target.value);
    } else if (e.target.name === "description") {
      setDescription(e.target.value);
    }
  };

  const submit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", File);
    formData.append("nom", nom);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("adresse", adresse);
    formData.append("tel", tel);
    formData.append("date", date);
    formData.append("description", description);
    try {
      await axios.post(`http://localhost:5000/api/jardin/signup`, formData);

      setsuccess(
        "Votre demande est enregistre. Vous recever un email de confirmation dans les bref delais"
      );
    } catch (err) {
      console.log(err);
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
                    <h4>Inscription</h4>
                    
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

                        <Button
                          type="button"
                          variant="primary"
                          onClick={pickImageHandler}
                          style={{ marginTop: "20px" }}
                        >
                          Choisir une image
                        </Button>
                      </div>
                      {!isValid && <p></p>}
                    </div>
                    <CustomInput
                      labelText="First Name..."
                      id="first"
                      name="nom"
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
                    <CustomInput
                      labelText="Email..."
                      id="email"
                      name="email"
                      onChange={onchange}
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "email",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <CustomInput
                      labelText="Password"
                      id="pass"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "password",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: "off",
                      }}
                      name="password"
                      type="password"
                      onChange={onchange}
                    />

                    <CustomInput
                      labelText="Adresse..."
                      id="first"
                      name="adresse"
                      onChange={onchange}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />

                    <CustomInput
                      labelText="telephone..."
                      id="first"
                      name="tel"
                      type="number"
                      onChange={onchange}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />

                    <Form.Group controlId="formGridAddress1">
                      <Form.Label>Date de creation</Form.Label>
                      <br></br>
                      <input
                        type="date"
                        id="start"
                        name="date"
                        min="1900-01-01"
                        max="2021-12-31"
                        required
                        onChange={onchange}
                      ></input>
                    </Form.Group>

                    <Form.Group controlId="exampleForm.ControlTextarea1">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={5}
                        required
                        name="description"
                        onChange={onchange}
                      />
                    </Form.Group>
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                  
                    <Button simple color="primary" size="lg" type="submit">
                      Signup
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
