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
route.get('/',enfantControllers.getEnfant); 
route.get("/jardin/:id", enfantControllers.getEnfantsByJardinId);
route.get("/parent/:id", enfantControllers.getEnfantsByParentId);
route.get("/enfant/:id",enfantControllers.getEnfantById);

route.delete('/:id',enfantControllers.deleteEnfant);

 

module.exports = route;
