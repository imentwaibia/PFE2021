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
import { Link } from "react-router-dom";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import WorkIcon from "@material-ui/icons/Work";
import _ from "lodash";
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import ChatIcon from '@material-ui/icons/Chat';



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


export default function ListParent(props) {
  const classes = useStyles();
  const { ...rest } = props;

  const [list, setList] = useState();
  const [fulldata,setFulldata]=useState([])
  const [error, seterror] = useState(null);
  const [success, setsuccess] = useState(null);
  const auth = useContext(Authcontext);

  useEffect(() => {
    const sendRequest = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/parent/jardin/${auth.userId}`
        );

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setList(responseData.existingParent);
        setFulldata(list)
      } catch (err) {
        seterror(err.message);
      }
    };

    sendRequest();
  }, []);

  const [searchTerm, setSearchTerm] = useState("");

  const handelSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  
  return (
    
    <div>
      
      <Header
        color="transparent"
        brand=" Happy Kids"
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
                <ErrorModel error={error} />
                <SuccessModel success={success} />
                <InputLabel htmlFor="input-with-icon-adornment">
                  Chercher
                </InputLabel>
                <Input
                  id="input-with-icon-adornment"
                  startAdornment={
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  }
                  onChange={handelSearch}
                />
                {list && (
                  <TableContainer component={Paper}>
                    <Table style={{ backgroundColor: "#ffebee" }}
                      className={classes.table}
                      aria-label="customized table"
                    >
                      <TableHead>
                        <TableRow>
                          <StyledTableCell style={{ backgroundColor: "#566573" }}>Nom</StyledTableCell>
                          <StyledTableCell style={{ backgroundColor: "#566573" }} align="right">
                            Prenom
                          </StyledTableCell>
                          <StyledTableCell  style={{ backgroundColor: "#566573" }}align="right">Email</StyledTableCell>
                          <StyledTableCell  style={{ backgroundColor: "#566573" }}align="right">
                            Adresse
                          </StyledTableCell>
                          <StyledTableCell  style={{ backgroundColor: "#566573" }}align="right">Tel</StyledTableCell>
                          <StyledTableCell style={{ backgroundColor: "#566573" }} align="right">
                            Action
                          </StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {list.filter((val)=>{
                          if(searchTerm == ""){
                            return val
                          }else if(val.nom.includes(searchTerm)){
                            return val
                          }
                        }).map((row) => (
                          <StyledTableRow key={row.name}>
                            <StyledTableCell component="th" scope="row">
                              {row.nom}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              {row.prenom}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              {row.email}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              {row.adresse}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              {row.tel}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              <Button
                                variant="outlined"
                                color="primary"
                                onClick={async (e) => {
                                  try {
                                    let response = await fetch(
                                      `http://localhost:5000/api/jardin/delguer/${auth.userId}`,
                                      {
                                        method: "PATCH",
                                        headers: {
                                          "Content-Type": "application/json",
                                        },
                                        body: JSON.stringify({
                                          idParent: row._id,
                                        }),
                                      }
                                    );
                                    let responsedata = await response.json();
                                    if (!response.ok) {
                                      throw new Error(responsedata.message);
                                    }
                                    setsuccess(
                                      "le parent " +
                                        row.nom +
                                        " " +
                                        row.prenom +
                                        " est maintenent déligué"
                                    );
                                  } catch (err) {
                                    console.log(err);
                                    seterror(err.message || "probleme!!");
                                  }
                                }}
                              >
                                <WorkIcon style={{ color: "greenyellow" }} />
                              </Button>

                              <Link to={`/message/${row._id}`}>
                                <Button variant="outlined" color="primary">
                                  <ChatIcon color="primary" />
                                </Button>
                              </Link>

                              <Link to={`/liste-enfants/${row._id}`}>
                                <Button variant="outlined" color="primary">
                                  <EmojiPeopleIcon color="primary" />
                                </Button>
                              </Link>
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



