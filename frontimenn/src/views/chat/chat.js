
import classNames from "classnames";

import { makeStyles, withStyles } from "@material-ui/core/styles";

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
import React, { useState, useEffect, useRef, useContext } from "react";
import { useParams } from "react-router-dom";
import { Input, Button } from "@material-ui/core";
import ErrorModel from "../../models/error-model";
import SuccessModel from "../../models/success-model";
import { Authcontext } from "../../context/auth-context";
import ReactScrollableFeed from "react-scrollable-feed";
import "./style.css";
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

function Chat(props) {
  const classes = useStyles();
  const { ...rest } = props;

  const id = useParams().id;
  const scroll = useRef();
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState("");
  const [error, seterror] = useState(null);
  const [success, setsuccess] = useState(null);

  const auth = useContext(Authcontext);
  useEffect(() => {
    setInterval(() => {
      const sendRequest = async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/api/message/jardin/${auth.userId}`
          );

          const responseData = await response.json();
          if (!response.ok) {
            throw new Error(responseData.message);
          }

          setMessages(responseData.messages);
        } catch (err) {
          seterror(err.message);
        }
      };
      console.log(messages);

      sendRequest();
    }, 2000);
  }, []);

  async function sendMessage(e) {
    e.preventDefault();
    const p = {
      text: msg,
      idSender: auth.userId,
      idRecever: id,
      jardinId: auth.userId,
      parentId: id,
    };
    setMessages(messages.concat(p));
    console.log(messages);
    try {
      let response = await fetch("http://localhost:5000/api/message/ajout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: msg,
          idSender: auth.userId,
          idRecever: id,
          jardinId: auth.userId,
          parentId: id,
        }),
      });
      let responsedata = await response.json();
      if (!response.ok) {
        throw new Error(responsedata.message);
      }
    } catch (err) {
      console.log(err);
      seterror(err.message || "probleme!!");
    }
    scroll.current.scrollIntoView({ behavior: "auto", block: "center", inline: "nearest" });
  }

  return (
    <div>
      <Header
        color="transparent"
        brand=""
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
                <div>
                  <div className="msgs">
                    {messages &&
                      messages
                        /* .filter((el) => el.idSender == id)
                        .filter((el) => el.idRecever == id) */

                        /* .filter((el) => el.idRecever === auth.userId)
                        .filter((el) => el.idRecever === id) */
                        .map((item) => (
                          <div>
                            <div ref={scroll}></div>
                            {item.idSender === auth.userId
                              ? item.idRecever === id && (
                                  <div
                                    key={id}
                                    className={`msg ${
                                      item.idSender === auth.userId
                                        ? "sent"
                                        : "received"
                                    }`}
                                  >
                                    <p>{item.text}</p>
                                  </div>
                                )
                              : item.idSender === id && (
                                  <div
                                    key={id}
                                    className={`msg ${
                                      item.idSender === auth.userId
                                        ? "sent"
                                        : "received"
                                    }`}
                                  >
                                    <p>{item.text}</p>
                                  </div>
                                )}
                          </div>
                        ))}
                  </div>
                  <div>
                    <form onSubmit={sendMessage}>
                      <div className="sendMsg">
                        <Input
                          style={{
                            width: "78%",
                            fontSize: "15px",
                            fontWeight: "550",
                            marginLeft: "5px",
                            marginBottom: "-3px",
                          }}
                          placeholder="Message..."
                          type="text"
                          value={msg}
                          onChange={(e) => setMsg(e.target.value)}
                        />
                        <Button
                          style={{
                            width: "18%",
                            fontSize: "15px",
                            fontWeight: "550",
                            margin: "4px 5% -13px 5%",
                            maxWidth: "200px",
        
                          }}
                          type="submit"
                        >
                          Envoyer
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Chat;
