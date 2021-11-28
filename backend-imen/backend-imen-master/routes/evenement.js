const express = require("express");
const route = express.Router();

const evenementControllers = require("../controllers/evenement");
const fileUpload = require("../middleware/file-upload");

const { check } = require("express-validator");

route.post(
  "/ajout",
  fileUpload.single("image"),
  [
    check("titre").not().isEmpty(),
    check("type").not().isEmpty(),
    check("description").not().isEmpty(),
  ],
  evenementControllers.ajoutEvenement
);

route.patch(
  "/:id",
  fileUpload.single("image"),
  [
    check("titre").not().isEmpty(),
    check("type").not().isEmpty(),
    check("description").not().isEmpty(),
  ],
  evenementControllers.updateEvenement
);

route.get("/:id", evenementControllers.getEvenementByJardinId);
route.delete("/:id", evenementControllers.deleteEvenement);

module.exports = route;
