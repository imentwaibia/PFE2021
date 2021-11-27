const express = require("express");
const route = express.Router();
const { check } = require("express-validator");
const messageControllers = require("../controllers/message");

route.post("/ajout", messageControllers.sendMessage);
route.post("/ajout/parent", messageControllers.sendMessageParentParent);
route.get('/',messageControllers.getMessage)
route.get('/jardin/:id',messageControllers.getMessageByJardinId)
route.get('/parent/:id',messageControllers.getMessageByParentId)

module.exports = route;
