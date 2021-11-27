const express = require("express");
const route = express.Router();

const reclamationController = require("../controllers/reclamation");

const { check } = require("express-validator");

route.post("/ajout", reclamationController.ajout);
route.get("/", reclamationController.getReclamation);
route.patch("/confirmation/:id", reclamationController.confirmationReclamation);

module.exports = route;
