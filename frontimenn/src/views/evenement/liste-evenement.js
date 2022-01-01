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

export default function ListeEvenement(props) {
  const classes = useStyles();
  const { ...rest } = props;

  const [list, setList] = useState();
  const [error, seterror] = useState(null);
  const [success, setsuccess] = useState(null);
  const auth = useContext(Authcontext);

  useEffect(() => {
    const sendRequest = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/evenement/${auth.userId}`
        );

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setList(responseData.existingEvenement);
      } catch (err) {
        seterror(err.message);
      }
    };

    sendRequest();
  }, []);

  console.log(list)

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
      <Parallax small filter image={require("assets/img/img5.jpg")} />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} className={classes.navWrapper}>
                <Link to={`/ajout-evenement`}>
                  <AjoutBTN title="Ajout evenement" />
                </Link>
                <ErrorModel error={error} />
                <SuccessModel success={success} />
                {list && (
                  <TableContainer component={Paper}>
                    <Table style={{ backgroundColor: "#ffebee" }}
                      className={classes.table}
                      aria-label="customized table"
                    >
                      <TableHead>
                        <TableRow>
                          <StyledTableCell style={{ backgroundColor: "#566573" }}>Image</StyledTableCell>
                          <StyledTableCell style={{ backgroundColor: "#566573" }}>Titre</StyledTableCell>
                          <StyledTableCell align="right" style={{ backgroundColor: "#566573" }}>
                            Date
                          </StyledTableCell>
                          <StyledTableCell align="right" style={{ backgroundColor: "#566573" }}>
                            Description
                          </StyledTableCell>
                          <StyledTableCell align="right" style={{ backgroundColor: "#566573" }}>
                            Action
                          </StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {list.map((row) => (
                          <StyledTableRow key={row.titre}>
                            <StyledTableCell component="th" scope="row">
                              <Image
                                src={`http://localhost:5000/${row.image}`}
                                roundedCircle
                                style={{ width: "100px", height: "100px" }}
                              />
                            </StyledTableCell>
                            <StyledTableCell component="th" scope="row">
                              {row.titre}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              {row.date}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              {row.description}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              <Link to={`/update-evenement/${row._id}`}>
                              
                                <Button variant="outlined" color="primary" title="Modifier evenement">
                                  <UpdateIcon style={{ color: "green" }} />
                                </Button>
                              </Link>

                              <Button variant="outlined" color="primary" title="Supprimer evenement">
                                <DeleteForeverIcon
                                  style={{ color: "red" } }
                                  onClick={async (event) => {
                                    try {
                                      let response = await fetch(
                                        `http://localhost:5000/api/evenement/${row._id}`,
                                        {
                                          method: "DELETE",
                                          headers: {
                                            "Content-Type": "application/json",
                                          },
                                        }
                                      );
                                      let responsedata = await response.json();
                                      if (!response.ok) {
                                        throw new Error(responsedata.message);
                                      }
                                      setList(
                                        list.filter((el) => el._id !== row._id)
                                      );
                                      setsuccess("evenement bien suprimer");
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
