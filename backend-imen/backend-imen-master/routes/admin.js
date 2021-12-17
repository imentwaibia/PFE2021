const express = require('express');
const route = express.Router();

const adminControllers = require('../controllers/admin')

const {check} = require('express-validator')

route.post('/signup', 
check('name')
.not()
.isEmpty(),
check('email')
.isEmail(),
check('password')
.isLength({min:8})
, adminControllers.signup)


route.post('/login', 
check('email')
.isEmail(),
check('password')
.isLength({min:8})
, adminControllers.AdminLogin)

route.get("/:AdminId", adminControllers.getAdminById);

module.exports= route