import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles, withStyles } from "@material-ui/core/styles";
// @material-ui/icons

// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import styles from "assets/jss/material-kit-react/views/profilePage.js";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { Authcontext } from "../../context/auth-context";
import ErrorModel from "../../models/error-model";
import SuccessModel from "../../models/success-model";
import Button from "@material-ui/core/Button";
import AjoutBTN from "views/Components/Sections/btnAjout";
import { Link, useParams } from "react-router-dom";
import { Image } from "react-bootstrap";
import UpdateIcon from "@material-ui/icons/Update";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import GetParent from "views/Components/Sections/modelGetParent";

const useStyles = makeStyles(styles, {
  table: {
    minWidth: 700,
  },
});
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export default function ListEnfant(props) {
  const classes = useStyles();
  const { ...rest } = props;

  const [enfants, setEnfants] = useState();
  const [error, seterror] = useState(null);
  const [success, setsuccess] = useState(null);
  const auth = useContext(Authcontext);

  const id = useParams().id;

  useEffect(() => {
    const sendRequest = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/enfant/parent/${id}`
        );

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setEnfants(responseData.enfants);
      } catch (err) {
        seterror(err.message);
      }
    };

    sendRequest();
  }, []);

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
      <Parallax small filter image={require("assets/img/img7.jpg")} />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} className={classes.navWrapper}>
                <Link to={`/ajout-enfants/${id}`}>
                  <AjoutBTN title="Ajout Enfant" />
                </Link>
                <ErrorModel error={error} />
                <SuccessModel success={success} />
                {enfants && (
                  <TableContainer component={Paper}>
                    <Table
                      className={classes.table}
                      aria-label="customized table"
                    >
                      <TableHead>
                        <TableRow>
                          <StyledTableCell>Image</StyledTableCell>
                          <StyledTableCell>Nom</StyledTableCell>
                          <StyledTableCell align="right">
                            Prenom
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            Date de naissance
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            Action
                          </StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {enfants
                          .filter((el) => el.jardinId === auth.userId)
                          .map((row) => (
                            <StyledTableRow key={row.name}>
                              <StyledTableCell component="th" scope="row">
                                <Image
                                  src={`http://localhost:5000/${row.photo}`}
                                  roundedCircle
                                  style={{ width: "100px", height: "100px" }}
                                />
                              </StyledTableCell>
                              <StyledTableCell component="th" scope="row">
                                {row.nom}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {row.prenom}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {row.Dnaissance}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                <GetParent parentId={row.parentId} />
                                <Link to={`/update-enfant/${row._id}`}>
                                  <Button variant="outlined" color="primary">
                                    <UpdateIcon style={{ color: "green" }} />
                                  </Button>
                                </Link>

                                <Button variant="outlined" color="primary">
                                  <DeleteForeverIcon
                                    style={{ color: "red" }}
                                    onClick={async (event) => {
                                      try {
                                        let response = await fetch(
                                          `http://localhost:5000/api/enfant/${row._id}`,
                                          {
                                            method: "DELETE",
                                            headers: {
                                              "Content-Type":
                                                "application/json",
                                            },
                                          }
                                        );
                                        let responsedata = await response.json();
                                        if (!response.ok) {
                                          throw new Error(responsedata.message);
                                        }
                                        setEnfants(
                                          enfants.filter(
                                            (el) => el._id !== row._id
                                          )
                                        );
                                        setsuccess("Enfants bien suprimer");
                                      } catch (err) {
                                        console.log(err);
                                        seterror(
                                          err.message || "il y a un probleme"
                                        );
                                      }
                                    }}
                                  />
                                </Button>
                              </StyledTableCell>
                            </StyledTableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
