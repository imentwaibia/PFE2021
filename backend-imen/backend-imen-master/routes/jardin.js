const express = require("express");
const route = express.Router();

const jardinControllers = require("../controllers/jardin");

const { check } = require("express-validator");

const fileUpload = require("../middleware/file-upload");

route.post(
  "/signup",
  fileUpload.single("image"),
  [
    check("nom").not().isEmpty(),
    check("email").normalizeEmail(),
    check("password").isLength({ min: 8 }),
    check("description").not().isEmpty(),
    check("tel").isLength({ min: 8 }),
  ],
  jardinControllers.signup
);

route.post(
  "/login",
  check("email").normalizeEmail(),
  check("password").isLength({ min: 8 }),
  jardinControllers.login
);

route.patch(
  "/:id",
  fileUpload.single("image"),
  [
    check("nom").not().isEmpty(),
    check("email").normalizeEmail(),
    check("password").isLength({ min: 8 }),
    check("description").not().isEmpty(),
    check("tel").isLength({ min: 8 }),
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
