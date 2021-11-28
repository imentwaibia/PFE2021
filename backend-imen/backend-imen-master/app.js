const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const path = require("path");

const adminRoutes = require("./routes/admin");
const jardinRoutes = require("./routes/jardin");
const parentsRoutes = require("./routes/parent");
const enfantRoutes = require("./routes/enfant");
const activityRoutes = require("./routes/activity");
const evenementRoutes = require("./routes/evenement");
const messageRoutes = require("./routes/message");
const ReclamationRoute = require("./routes/reclamation");

const httperror = require("./models/error");

const mongoose = require("mongoose");

app.use(bodyParser.json());

app.use("/uploads/images", express.static(path.join("uploads", "images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

app.use("/api/admin", adminRoutes);
app.use("/api/jardin", jardinRoutes);
app.use("/api/parent", parentsRoutes);
app.use("/api/enfant", enfantRoutes);
app.use("/api/activity", activityRoutes);
app.use("/api/evenement", evenementRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/reclamation", ReclamationRoute);

app.use((req, res, next) => {
  const error = new httperror("could not find that page", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "an unknown error occurred " });
});

mongoose
  .connect(
    "mongodb+srv://jardin:jardin@cluster0.jmmuw.mongodb.net/jardin?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
