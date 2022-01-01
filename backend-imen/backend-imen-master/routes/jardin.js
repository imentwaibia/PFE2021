// express
const express = require("express");
const route = express.Router();

const jardinControllers = require("../controllers/jardin");

const { check } = require("express-validator");

const fileUpload = require("../middleware/file-upload");
// signup
route.post(
  "/signup",
  fileUpload.single("image"),
  [
    check("nom").not().isEmpty(),
    check("email").isEmail(),
    check("password").isLength({ min: 8 }),
    check("description").not().isEmpty(),
    check("tel", "enter a valid phone number").isLength({ min: 8,maxLength: 11 }),
  ],
  jardinControllers.signup
);

route.post(
  "/login",
  check("email").isEmail(),
  check("password").isLength({ min: 8 }),
  jardinControllers.login
);

route.patch(
  "/:id",
  fileUpload.single("image"),
  [
    check("nom").not().isEmpty(),
    check("email").isEmail(),
    check("password").isLength({ min: 8 }),
    check("description").not().isEmpty(),
    check("tel", "enter a valid phone number").isLength({ min: 8,maxLength: 11 }),
  ],
  jardinControllers.updateJardin
);

route.delete("/:UserId", jardinControllers.deleteJardin);

route.get("/", jardinControllers.getJardin);

route.get("/:UserId", jardinControllers.getJardinById);

route.patch("/bloquage/:UserId", jardinControllers.bloquageJardin);
route.patch("/delguer/:id", jardinControllers.setDeleguer);
route.patch("/confirm/:id", jardinControllers.ConfirmeJardin);


module.exports = route;
