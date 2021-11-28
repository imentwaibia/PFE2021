const express = require("express");
const route = express.Router();

const enfantControllers = require("../controllers/enfant");
const fileUpload = require("../middleware/file-upload");

const { check } = require("express-validator");

route.post(
  "/ajoutParJardin",
  fileUpload.single("image"),
  [
    check("nom").not().isEmpty(),
    check("prenom").not().isEmpty(),
    check("Dnaissance").not().isEmpty(),
  ],
  enfantControllers.ajoutEnfantParJardin
);

route.post(
  "/ajout",
  fileUpload.single("image"),
  [
    check("nom").not().isEmpty(),
    check("prenom").not().isEmpty(),
    check("Dnaissance").not().isEmpty(),
  ],
  enfantControllers.ajoutEnfant
);

route.patch(
  "/:id",
  fileUpload.single("image"),
  [check("nom").not().isEmpty(),
  check("prenom").not().isEmpty(),
  check("Dnaissance").not().isEmpty()],
  enfantControllers.updateEnfant
);

route.get("/jardin/:id", enfantControllers.getEnfantsByJardinId);
route.get("/parent/:id", enfantControllers.getEnfantsByParentId);

route.delete('/:id',enfantControllers.deleteEnfant)

/* route.get('/:id',enfantControllers.getEnfant) */

module.exports = route;
