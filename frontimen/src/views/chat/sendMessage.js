import "./style.css";
import React, { useState, useContext } from "react";
import { Input, Button } from "@material-ui/core";
import ErrorModel from "../../models/error-model";
import SuccessModel from "../../models/success-model";
import { Authcontext } from "../../context/auth-context";

function SendMessage(props) {
  const [msg, setMsg] = useState("");
  const [error, seterror] = useState(null);
  const [success, setsuccess] = useState(null);

  const auth = useContext(Authcontext);

  async function sendMessage(e) {
    e.preventDefault();
    const p = {
      text: msg,
      idSender: auth.userId,
      idRecever: props.id,
      jardinId: auth.userId,
      parentId: props.id,
    };
    try {
      let response = await fetch("http://localhost:5000/api/message/ajout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: msg,
          idSender: auth.userId,
          idRecever: props.id,
          jardinId: auth.userId,
          parentId: props.id,
        }),
      });
      let responsedata = await response.json();
      if (!response.ok) {
        throw new Error(responsedata.message);
      }
      setMe
    } catch (err) {
      console.log(err);
      seterror(err.message || "probleme!!");
    }
    props.scroll.current.scrollIntoView({ behavior: "smooth" });
  }
  return (
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
            Send
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SendMessage;
