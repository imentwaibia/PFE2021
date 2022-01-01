//1-require express
const express = require("express");
//2-instance of express
const app = express();

const bodyParser = require("body-parser");

const path = require("path");
// require routes
const adminRoutes = require("./routes/admin");
const jardinRoutes = require("./routes/jardin");
const parentsRoutes = require("./routes/parent");
const enfantRoutes = require("./routes/enfant");
const activityRoutes = require("./routes/activity");
const evenementRoutes = require("./routes/evenement");
const messageRoutes = require("./routes/message");
const ReclamationRoute = require("./routes/reclamation");

const httperror = require("./models/error");
//require mongoose
const mongoose = require("mongoose");

app.use(bodyParser.json());
//img
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
// import routes
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
//connect to db
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true);
mongoose
  .connect(
    "mongodb+srv://jardin:jardin@cluster0.jmmuw.mongodb.net/jardin?retryWrites=true&w=majority"
  )
  .then(() => {
    // create server
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
