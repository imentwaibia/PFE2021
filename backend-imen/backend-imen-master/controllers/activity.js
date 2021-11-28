const httpError = require("../models/error");
const activity = require("../models/activity");
const { validationResult } = require("express-validator");
const jardin = require("../models/jardin");

const ajoutActivity = async (req, res, next) => {

  const { titre, type, description, jardinId } = req.body;
  console.log(titre,type,description,jardinId)

  const createdActivity = new activity({
    titre,
    type,
    description,
    image: req.file.path,
    jardinId,
  });

  let existingJardin;

  try {
    existingJardin = await jardin.findById(jardinId);
  } catch (err) {
    const error = new httpError("problem !!!!!", 500);
    return next(error);
  }

  try {
    await createdActivity.save();
    existingJardin.activitys.push(createdActivity);
    await existingJardin.save();
  } catch (err) {
    const error = new httpError("failed signup", 500);
    return next(error);
  }

  res.status(201).json({ activity: createdActivity });
};

const updateActivity = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(new httpError("invalid input passed ", 422));
  }

  const { titre, type, description } = req.body;
  const id = req.params.id;
  let existingActivity;

  try {
    existingActivity = await activity.findById(id);
  } catch {
    return next(new httpError("failed ", 500));
  }
  existingActivity.titre = titre;
  existingActivity.type = type;
  existingActivity.description = description;

  existingActivity.image = req.file.path;

  try {
    existingActivity.save();
  } catch {
    return next(new httpError("failed to save ", 500));
  }

  res.status(200).json({ existingActivity: existingActivity });
};

const getEnfantsByJardinId = async (req, res, next) => {
  const jardinId = req.params.id;

  let existingActivity;
  try {
    existingActivity = await jardin.findById(jardinId).populate("activitys");
  } catch (err) {
    const error = new httpError(
      "Fetching activity failed, please try again later.",
      500
    );
    return next(error);
  }

  if (!existingActivity || existingActivity.activitys.length === 0) {
    return next(
      new httpError("Could not find activity for the provided user id.", 404)
    );
  }

  res.json({
    existingActivity: existingActivity.activitys.map((el) =>
      el.toObject({ getters: true })
    ),
  });
};

const deleteActivity = async (req, res, next) => {
  const id = req.params.id;
  let existingActivity;
  try {
    existingActivity = await activity.findById(id);
  } catch {
    return next(new httpError("failed", 500));
  }

  if (!existingActivity) {
    return next(new httpError("jardin does not exist", 500));
  }
  try {
    existingActivity.remove();
  } catch {
    return next(new httpError("failed", 500));
  }
  res.status(200).json({ message: "deleted" });
};


exports.ajoutActivity =ajoutActivity
exports.updateActivity = updateActivity
exports.getEnfantsByJardinId = getEnfantsByJardinId
exports.deleteActivity = deleteActivity
