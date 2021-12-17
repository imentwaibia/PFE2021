import React, { useContext, useState, useEffect, useRef } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Camera from "@material-ui/icons/Camera";
import Palette from "@material-ui/icons/Palette";
import Favorite from "@material-ui/icons/Favorite";
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
//import NavPills from "components/NavPills/NavPills.js";
import Parallax from "components/Parallax/Parallax.js";

import profile from "assets/img/faces/christian.jpg";

import studio1 from "assets/img/examples/studio-1.jpg";
import studio2 from "assets/img/examples/studio-2.jpg";
import studio3 from "assets/img/examples/studio-3.jpg";
import studio4 from "assets/img/examples/studio-4.jpg";
import studio5 from "assets/img/examples/studio-5.jpg";
import work1 from "assets/img/examples/olu-eletu.jpg";
import work2 from "assets/img/examples/clem-onojeghuo.jpg";
import work3 from "assets/img/examples/cynthia-del-rio.jpg";
import work4 from "assets/img/examples/mariya-georgieva.jpg";
import work5 from "assets/img/examples/clem-onojegaw.jpg";

import styles from "assets/jss/material-kit-react/views/profilePage.js";
import { Authcontext } from "../../context/auth-context";
import axios from "axios";
import { Form, Image } from "react-bootstrap";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Email from "@material-ui/icons/Email";
import Icon from "@material-ui/core/Icon";
import CardBody from "components/Card/CardBody.js";
import InputAdornment from "@material-ui/core/InputAdornment";
import People from "@material-ui/icons/People";
import CardHeader from "components/Card/CardHeader.js";
import Card from "components/Card/Card.js";
import ErrorModel from "../../models/error-model";
import SuccessModel from "../../models/success-model";

const useStyles = makeStyles(styles);

export default function ProfilePage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
  const auth = useContext(Authcontext);

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
    
  };

  const pickImageHandler = (event) => {
    filePickerRef.current.click();
  };

  const [nom, setNom] = useState(auth.user.nom);
  const [email, setEmail] = useState(auth.user.email);
  const [password, setPassword] = useState();
  const [adresse, setAdresse] = useState(auth.user.adresse);
  const [tel, setTel] = useState(auth.user.tel);
  const [date, setDate] = useState(auth.user.date_creation);
  const [description, setDescription] = useState(auth.user.description);
  const [error, seterror] = useState(null);
  const [success, setsuccess] = useState(null);
  const [list, setList] = useState();

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
      await axios.patch(
        `http://localhost:5000/api/jardin/${auth.userId}`,
        formData
      );

      setsuccess("Votre profil a été modifier .");
    } catch (err) {
      console.log(err);
      seterror(err.message || "probleme!!");
    }
  };

  return (
    <div>
      <Header
        color="transparent"
        brand="Happy Kids"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 200,
          color: "white",
        }}
        {...rest}
      />
      <Parallax small filter image={require("assets/img/img9.jpg")} />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6}>
                <div className={classes.profile}>
                  <div>
                    {previewUrl ? (
                      <img
                        src={previewUrl}
                        alt="..."
                        className={imageClasses}
                        onClick={pickImageHandler}
                      />
                    ) : (
                      <img
                        src={`http://localhost:5000/${auth.user.logo}`}
                        alt="..."
                        className={imageClasses}
                        onClick={pickImageHandler}
                      />
                    )}
                  </div>
                </div>
              </GridItem>
              <GridItem xs={12}>
                <Card className={classes[cardAnimaton]}>
                  <form className={classes.form} onSubmit={submit}>
                    <ErrorModel error={error} />
                    <SuccessModel success={success} />

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

                        {!isValid && <p></p>}
                      </div>
                      <CustomInput
                        labelText="First Name..."
                        id="first"
                        name="nom"
                        value={nom}
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
                        value={email}
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
                        onChange={onchange}
                      />

                      <CustomInput
                        labelText="Adresse..."
                        id="first"
                        name="adresse"
                        value={adresse}
                        onChange={onchange}
                        formControlProps={{
                          fullWidth: true,
                        }}
                      />

                      <CustomInput
                        labelText="telephone..."
                        id="first"
                        name="tel"
                        value={tel}
                        onChange={onchange}
                        formControlProps={{
                          fullWidth: true,
                        }}
                      />

                      <Form.Group controlId="formGridAddress1">
                        <Form.Label>Date de creation</Form.Label>
                        <br></br>
                        <input
                          value={date}
                          type="date"
                          id="start"
                          name="date"
                          min="2000-01-01"
                          max="2021-10-31"
                          required
                          onChange={onchange}
                        ></input>
                      </Form.Group>

                      <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                          as="textarea"
                          value={description}
                          rows={5}
                          required
                          name="description"
                          onChange={onchange}
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
            <div className={classes.description}></div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
