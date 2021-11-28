const express = require("express");
const route = express.Router();

const activityControllers = require("../controllers/activity");
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
  activityControllers.ajoutActivity
);

route.patch(
  "/:id",
  fileUpload.single("image"),
  [
    check("titre").not().isEmpty(),
    check("type").not().isEmpty(),
    check("description").not().isEmpty(),
  ],
  activityControllers.updateActivity
);

route.get('/:id',activityControllers.getEnfantsByJardinId)
route.delete('/:id',activityControllers.deleteActivity)

module.exports = route;
