const httpError = require("../models/error");

const parent = require("../models/parent");
const enfant = require("../models/enfant");
const { validationResult } = require("express-validator");
const jardin = require("../models/jardin");



const ajoutEnfant = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(new httpError("invalid input passed ", 422));
  }

  const { nom, prenom, Dnaissance, parentId } = req.body;

  const createdEnfant = new enfant({
    nom,
    prenom,
    Dnaissance,
    photo: req.file.path,
    parentId,
  });

  let existingParent;

  try {
    existingParent = await parent.findById(parentId);
  } catch (err) {
    const error = new httpError("problem !!!!!", 500);
    return next(error);
  }

  try {
    await createdEnfant.save();
    existingParent.enfants.push(createdEnfant);
    await existingParent.save();
  } catch (err) {
    const error = new httpError("failed signup", 500);
    return next(error);
  }

  res.status(201).json({ Enfant: createdEnfant });
};

const updateEnfant = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(new httpError("invalid input passed ", 422));
  }

  const { nom, prenom, Dnaissance } = req.body;
  const id = req.params.id;
  let existingEnfant;

  try {
    existingEnfant = await enfant.findById(id);
  } catch {
    return next(new httpError("failed ", 500));
  }
  existingEnfant.nom = nom;
  existingEnfant.prenom = prenom;
  existingEnfant.Dnaissance = Dnaissance;
  existingEnfant.photo = req.file.path;

  try {
    existingEnfant.save();
  } catch {
    return next(new httpError("failed to save ", 500));
  }

  res.status(200).json({ existingEnfant: existingEnfant });
};

const getEnfantsByJardinId = async (req, res, next) => {
  const jardinId = req.params.id;

  let existingEnfant;
  try {
    existingEnfant = await jardin.findById(jardinId).populate("enfants");
  } catch (err) {
    const error = new httpError(
      "Fetching enfats failed, please try again later.",
      500
    );
    return next(error);
  }

  if (!existingEnfant || existingEnfant.enfants.length === 0) {
    return next(
      new httpError("Could not find child for the provided user id.", 404)
    );
  }

  res.json({
    enfants: existingEnfant.enfants.map((enfant) =>
      enfant.toObject({ getters: true })
    ),
  });
};

const getEnfantsByParentId = async (req, res, next) => {
  const id = req.params.id;

  let existingEnfant;
  try {
    existingEnfant = await parent.findById(id).populate("enfants");
  } catch (err) {
    const error = new httpError(
      "Fetching enfats failed, please try again later.",
      500
    );
    return next(error);
  }

  if (!existingEnfant || existingEnfant.enfants.length === 0) {
    return next(
      new httpError("Could not find child for the provided user id.", 404)
    );
  }

  res.json({
    enfants: existingEnfant.enfants.map((enfant) =>
      enfant.toObject({ getters: true })
    ),
  });
};

const ajoutEnfantParJardin = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(new httpError("invalid input passed ", 422));
  }

  const { nom, prenom, Dnaissance, parentId, jardinId } = req.body;

  const createdEnfant = new enfant({
    nom,
    prenom,
    Dnaissance,
    photo: req.file.path,
    parentId,
    jardinId
  });

  let existingParent;

  try {
    existingParent = await parent.findById(parentId);
  } catch (err) {
    const error = new httpError("problem !!!!!", 500);
    return next(error);
  }

  let existingJardin;

  try {
    existingJardin = await jardin.findById(jardinId);
  } catch (err) {
    const error = new httpError("problem !!!!!", 500);
    return next(error);
  }

  try {
    await createdEnfant.save();
    existingParent.enfants.push(createdEnfant);
    await existingParent.save();
    existingJardin.enfants.push(createdEnfant);
    await existingJardin.save();
  } catch (err) {
    const error = new httpError("failed signup", 500);
    return next(error);
  }

  res.status(201).json({ Enfant: createdEnfant });
};

const deleteEnfant = async (req, res, next) => {
  const id = req.params.id;
  let existingEnfants;
  try {
    existingEnfants = await enfant.findById(id);
  } catch {
    return next(new httpError("failed", 500));
  }

  if (!existingEnfants) {
    return next(new httpError("jardin does not exist", 500));
  }
  try {
    existingEnfants.remove();
  } catch {
    return next(new httpError("failed", 500));
  }
  res.status(200).json({ message: "deleted" });
};

exports.ajoutEnfant = ajoutEnfant;

exports.updateEnfant = updateEnfant;

exports.getEnfantsByJardinId = getEnfantsByJardinId;

exports.ajoutEnfantParJardin = ajoutEnfantParJardin;

exports.deleteEnfant = deleteEnfant;

exports.getEnfantsByParentId = getEnfantsByParentId
