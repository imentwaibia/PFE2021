const httpError = require("../models/error");
const evenement = require("../models/evenement");
const { validationResult } = require("express-validator");
const jardin = require("../models/jardin");

const ajoutEvenement = async (req, res, next) => {
  const { titre, date, description, jardinId } = req.body;

  const createdEvenement = new evenement({
    titre,
    date,
    description,
    image: req.file.path,
    jardinId,
  });
  console.log(titre, date, description,jardinId);

  let existingJardin;

  try {
    existingJardin = await jardin.findById(jardinId);
  } catch (err) {
    const error = new httpError("problem !!!!!", 500);
    return next(error);
  }

  try {
    await createdEvenement.save();
    existingJardin.evenements.push(createdEvenement);
    await existingJardin.save();
  } catch (err) {
    const error = new httpError("failed signup", 500);
    return next(error);
  }

  res.status(201).json({ evenement: createdEvenement });
};
const getEnfantsByJardinId = async (req, res, next) => {
  const jardinId = req.params.id;

  let existingEvenement;
  try {
    existingEvenement = await jardin.findById(jardinId).populate("evenements");
  } catch (err) {
    const error = new httpError(
      "Fetching evenement failed, please try again later.",
      500
    );
    return next(error);
  }

  if (!existingEvenement || existingEvenement.evenements.length === 0) {
    return next(
      new httpError("Could not find evenement for the provided user id.", 404)
    );
  }

  res.json({
    existingEvenement: existingEvenement.evenements.map((el) =>
      el.toObject({ getters: true })
    ),
  });
};
const updateEvenement = async (req, res, next) => {
  const { titre, date, description } = req.body;
  const id = req.params.id;
  let existingEvenement;

  try {
    existingEvenement = await evenement.findById(id);
  } catch {
    return next(new httpError("failed ", 500));
  }
  existingEvenement.titre = titre;
  existingEvenement.date = date;
  existingEvenement.description = description;
  

  try {
    existingEvenement.save();
  } catch {
    return next(new httpError("failed to save ", 500));
  }

  res.status(200).json({ existingEvenement: existingEvenement });
};

//getAllEvenement
const getEvenement = async (req, res, next) => {
  let existingEvenement;
  try {
    existingEvenement = await evenement.find({}, "-pasword");
  } catch {
    const error = new httpError("failed signup", 500);
    return next(error);
  }
  res.json({ existingEvenement: existingEvenement });
};
//get Evenement ById
const getEvenementById = async (req, res, next) => {
  const id = req.params.id;
  let existingEvenement;
  try {
    existingEvenement = await evenement.findById(id);
  } catch {
    const error = new httpError("failed ", 500);
    return next(error);
  }
  res.json({ existingEvenement: existingEvenement });
};


const deleteEvenement = async (req, res, next) => {
  const id = req.params.id;
  let existingEvenement;
  try {
    existingEvenement = await evenement.findById(id);
  } catch {
    return next(new httpError("failed", 500));
  }

  if (!existingEvenement) {
    return next(new httpError("jardin does not exist", 500));
  }
  try {
    existingEvenement.remove();
  } catch {
    return next(new httpError("failed", 500));
  }
  res.status(200).json({ message: "deleted" });
};
exports.getEvenement = getEvenement;
exports.ajoutEvenement = ajoutEvenement;
exports.updateEvenement = updateEvenement;
exports.getEvenementById = getEvenementById;
exports.deleteEvenement = deleteEvenement;
exports.getEnfantsByJardinId = getEnfantsByJardinId;