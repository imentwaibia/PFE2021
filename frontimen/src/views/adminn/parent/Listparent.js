import React, { useEffect, useState } from "react";
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/views/loginPage.js";
import { Row, Col, Container, Image, Button } from "react-bootstrap";
import { styled } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell, { tableCellClasses } from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import ErrorModel from "../../../models/error-model";
import SuccessModel from "../../../models/success-model";
import AccessibilityIcon from "@material-ui/icons/Accessibility";
import image from "assets/img/img5.jpg";
import { Link } from "react-router-dom";
const useStyles = makeStyles(styles);

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const Listparent = (props) => {
  const [list, setList] = useState();
  const [error, seterror] = useState(null);
  const [success, setsuccess] = useState(null);

  useEffect(() => {
    const sendRequest = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/parent/`);

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setList(responseData.existingParent);
      } catch (err) {
        seterror(err.message);
      }
    };

    sendRequest();
  }, []);

  console.log(list);
  const classes = useStyles();
  const { ...rest } = props;

  return (
    <div style={{  backgroundColor: "#FDEDEC"}}>
    
    <Header
        absolute
        color="transparent"
        brand=""
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
       
              <center>
      <Container style={{  margin: "2%" }}>
        <Row>
          <Col></Col>
          <Col xs={12}>
            <ErrorModel error={error} />
            <SuccessModel success={success} />
            <TableContainer component={Paper}>
              <Table style={{ backgroundColor: "#F4ECF7" }}>
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="right" style={{  backgroundColor: "#ABB2B9"}}>Nom</StyledTableCell>
                    <StyledTableCell align="right" style={{  backgroundColor: "#ABB2B9"}}>Prenom</StyledTableCell>
                    <StyledTableCell align="right" style={{  backgroundColor: "#ABB2B9"}}>Email</StyledTableCell>
                    <StyledTableCell align="right" style={{  backgroundColor: "#ABB2B9"}}>Adresse</StyledTableCell>
                    <StyledTableCell align="right" style={{  backgroundColor: "#ABB2B9"}}>Tel</StyledTableCell>
                    <StyledTableCell align="right" style={{  backgroundColor: "#ABB2B9"}}>Enfants</StyledTableCell>
                  </TableRow>
                  
                </TableHead>
                <TableBody>
                  {list &&
                    list.map((row) => (
                      <StyledTableRow key={row.name}>
                        <StyledTableCell align="right">
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
                          <Link to={`/Listenfantparent/${row._id}`}>
                            <AccessibilityIcon
                              fontSize="large"
                              color="primary"
                              variant="success"
                            />
                          </Link>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Col>
          <Col></Col>
        </Row>
      </Container>
      </center>
    </div>
    </div>
    </div>
  );
};

export default Listparent;
