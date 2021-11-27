import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Alert from "@material-ui/lab/Alert";

export default function ErrorModel(props) {
  return <>{props.success && <Alert severity="success">{props.success}</Alert>}</>;
}
