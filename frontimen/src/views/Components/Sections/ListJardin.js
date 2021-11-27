import React,{useEffect, useState} from "react";
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import styles from "assets/jss/material-kit-react/views/loginPage.js";
import { makeStyles } from "@material-ui/core/styles";
import Jardin from './Jardin';
import image from "assets/img/img5.jpg";

import "./ListJardin.css";

const useStyles = makeStyles(styles);
const ListJardin = () => {
    const [list, setList] = useState();
    const [error, seterror] = useState(null);
    const [success, setsuccess] = useState(null);
    useEffect(() => {
        const sendRequest = async () => {
          try {
            const response = await fetch(`http://localhost:5000/api/jardin/`);
    
            const responseData = await response.json();
            if (!response.ok) {
              throw new Error(responseData.message);
            }
    
            setList(responseData.existingJardin);
          } catch (err) {
            seterror(err.message);
          }
        };
    
        sendRequest();
      }, []);
      console.log(list);
      const classes = useStyles();
     
    return (
      <div style={{  backgroundColor: "#FDEDEC"}}>
     
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

      <h1>Kids corner</h1>
      <h3>Votre établissement d'aprés votre localisation</h3>
      </center>
        <div classeName="listJardin" 
        style= {{width: "90%",
            height: "80%",
            display:"flex" ,
            flexWrap: "wrap",
            margin:"10%",
            justifyContent: "space-between" ,
            padding: "5%"}}>
      {list &&
        list.map((jardin)=>

    <Jardin jardin ={jardin} key={jardin.id}/>
      )}
    </div>
    </div>
    </div>
    </div>
  );
}
       
    

export default ListJardin
