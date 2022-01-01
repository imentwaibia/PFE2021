const httpError = require("../models/error");
const reclamation = require("../models/reclamation");
const parent = require("../models/parent");
const jardin = require("../models/jardin");
const { validationResult } = require("express-validator");

const nodemailer = require("nodemailer");

const log = console.log;
// let transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "twaibia.imen@gmail", // TODO: your gmail account
//     pass: "imenmastere@@", // TODO: your gmail password
//     // user: process.env.EMAIL || "twaibia.imen@gmail", // TODO: your gmail account
//     // pass: process.env.PASSWORD || "imenmastere@@", // TODO: your gmail password
//   }
// });

const ajout = async (req, res, next) => {
  const { sujet, description, jardinId, parentId } = req.body;

  const createdReclamation = new reclamation({
    sujet,
    description,
    jardinId,
    parentId,
    finished: false,
  });

  try {
    await createdReclamation.save();
  } catch (err) {
    const error = new httpError("failed signup", 500);
    return next(error);
  }

  res.status(201).json({ reclamation: createdReclamation });
};

const getReclamation = async (req, res, next) => {
  // let existingReclamation;
  // try {
  //   existingReclamation = await reclamation.find();
  // } catch {
  //   const error = new httpError("failed ", 500);
  //   return next(error);
  // }
  // res.json({ reclamation: existingReclamation });
  // res.send("it works ");
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'GreensPFE@gmail.com', // TODO: your gmail account
      pass: 'greens2022'
       // TODO: your gmail password
      // user: process.env.EMAIL || "twaibia.imen@gmail", // TODO: your gmail account
      // pass: process.env.PASSWORD || "imenmastere@@", // TODO: your gmail password
    }
  });

  let mailOptions = {
    from: "GreensPFE@gmail.com", // TODO: email sender
    to: parent.email, // TODO: email receiver
    subject: "Confirmation de reclamation",
    text:"Votre reclamation pour le jardin " +
     existingJardin.nom +
    " est prise en consédiration",
  };

  await transporter.sendMail(mailOptions, function(err, data){
    if (err) {
    console.log("Error occurs");
    
    } else {
    res.send("Email sent!!!");
    }
  });

};

const confirmationReclamation = async (req, res, next) => {
  const { jardinId, parentId } = req.body;
  
  console.log(jardinId);
  console.log(parentId);
  const id = req.params.id;

  let existingReclamation;
  try {
    existingReclamation = await reclamation.findById(id);
  } catch {
    const error = new httpError("failed ", 500);
    return next(error);
  }

  let existingParent;
  try {
    existingParent = await parent.findById(parentId);
  } catch {
    const error = new httpError("failed signup", 500);
    return next(error);
  }

  let existingJardin;
  try {
    existingJardin = await jardin.findById(jardinId);
  } catch {
    const error = new httpError("failed signup", 500);
    return next(error);
  }

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "GreensPFE@gmail.com", // TODO: your gmail account
      pass: "greens2022", // TODO: your gmail password
      // user: process.env.EMAIL || "twaibia.imen@gmail", // TODO: your gmail account
      // pass: process.env.PASSWORD || "imenmastere@@", // TODO: your gmail password
    }
  });

  let mailOptions = {
    from: "GreensPFE@gmail.com", // TODO: email sender

    to: "walid.ghouili98@gmail.com", // TODO: email receiver
    //to: parent.email, // TODO: email receiver
    subject: "Confirmation de reclamation",
    text:
      "Votre reclamation pour le jardin "
    // text:
    //   "Votre reclamation pour le jardin " +
    //   existingJardin.nom +
    //   " est prise en consédiration",
  };

  transporter.sendMail(mailOptions, function(err, data){
    if (err) {
      return log("Error occurs");
    }
    return log("Email sent!!!" + data.response);
  });

  existingReclamation.finished = true;

  try {
    existingReclamation.save();
  } catch {
    return next(new httpError("failed to save ", 500));
  }

  res.json({ existingParent: existingParent });
};

exports.ajout = ajout;
exports.getReclamation = getReclamation;
exports.confirmationReclamation = confirmationReclamation;
