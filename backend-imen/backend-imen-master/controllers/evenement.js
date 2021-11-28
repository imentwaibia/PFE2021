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
  existingEvenement.image = req.file.path;

  try {
    existingEvenement.save();
  } catch {
    return next(new httpError("failed to save ", 500));
  }

  res.status(200).json({ existingEvenement: existingEvenement });
};

const getEvenementByJardinId = async (req, res, next) => {
  const jardinId = req.params.id;

  let existingEvenement;
  try {
    existingEvenement = await jardin.findById(jardinId).populate("evenements");
  } catch (err) {
    const error = new httpError(
      "Fetching enfats failed, please try again later.",
      500
    );
    return next(error);
  }

  if (!existingEvenement || existingEvenement.evenements.length === 0) {
    return next(
      new httpError("Could not find child for the provided user id.", 404)
    );
  }

  res.json({
    existingEvenement: existingEvenement.evenements.map((el) =>
      el.toObject({ getters: true })
    ),
  });
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

exports.ajoutEvenement = ajoutEvenement;
exports.updateEvenement = updateEvenement;
exports.getEvenementByJardinId = getEvenementByJardinId;
exports.deleteEvenement = deleteEvenement;
