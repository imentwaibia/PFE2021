const httpError = require("../models/error");

const parent = require("../models/parent");
const jardin = require("../models/jardin");

const { validationResult } = require("express-validator");

const jwt = require("jsonwebtoken");

const signup = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(new httpError("invalid input passed ", 422));
  }

  const { nom, prenom, email, password, adresse, tel } = req.body;
  let existingparent;
  try {
    existingparent = await parent.findOne({ email: email });
  } catch (err) {
    const error = new httpError("problems!!!", 500);
    return next(error);
  }

  if (existingparent) {
    const error = new httpError("parent exist", 422);
    return next(error);
  }

  const createdParent = new parent({
    nom,
    prenom,
    email,
    password,
    adresse,
    tel,
    actif: true,
    enfant: [],
  });

  try {
    await createdParent.save();
  } catch (err) {
    const error = new httpError("failed signup", 500);
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { parentId: createdParent.id, email: createdParent.email },
      "secret-thinks",
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new httpError("failed signup try again later", 500);
    return next(error);
  }

  res.status(201).json({
    parentId: createdParent.id,
    email: createdParent.email,
    token: token,
  });
};

const login = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(new httpError("invalid input passed", 422));
  }
  const { email, password } = req.body;
  let existingParent;
  try {
    existingParent = await parent.findOne({ email: email });
  } catch {
    return next(new httpError("failed!!", 500));
  }
  if (!existingParent || existingParent.password !== password) {
    return next(new httpError("invalid input passed", 422));
  }
  let token;
  try {
    token = jwt.sign(
      { userId: existingParent.id, email: existingParent.email },
      "secret-thinks",
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new httpError("failed signup try again later", 500);
    return next(error);
  }
  res.status(200).json({ Parent: existingParent, token: token });
};

const updateParent = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(new httpError("invalid input passed ", 422));
  }

  const { nom, prenom, email, password, adresse, tel } = req.body;
  const id = req.params.id;
  let existingParent;

  try {
    existingParent = await parent.findById(id);
  } catch {
    return next(new httpError("failed ", 500));
  }
  existingParent.nom = nom;
  existingParent.prenom = prenom;
  existingParent.email = email;
  existingParent.password = password;
  existingParent.adresse = adresse;
  existingParent.tel = tel;

  try {
    existingParent.save();
  } catch {
    return next(new httpError("failed to save ", 500));
  }

  res.status(200).json({ existingParent: existingParent });
};

const deleteParent = async (req, res, next) => {
  const id = req.params.id;
  let existingParent;
  try {
    existingParent = await parent.findById(UserId);
  } catch {
    return next(new httpError("failed", 500));
  }

  if (!existingParent) {
    return next(new httpError("parent does not exist", 500));
  }
  try {
    existingParent.remove();
  } catch {
    return next(new httpError("failed", 500));
  }
  res.status(200).json({ message: "deleted" });
};

const getParent = async (req, res, next) => {
  let existingParent;
  try {
    existingParent = await parent.find({}, "-pasword");
  } catch {
    const error = new httpError("failed signup", 500);
    return next(error);
  }
  res.json({ existingParent: existingParent });
};

const getParentById = async (req, res, next) => {
  const id = req.params.id;
  let existingParent;
  try {
    existingParent = await parent.findById(id);
  } catch {
    const error = new httpError("failed signup", 500);
    return next(error);
  }
  res.json({ existingParent: existingParent });
};

const bloquerParent = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(new httpError("invalid input passed ", 422));
  }

  const id = req.params.id;
  let existingParent;

  try {
    existingParent = await parent.findById(id);
  } catch {
    return next(new httpError("failed ", 500));
  }
  if (existingParent.actif === true) {
    existingParent.actif = false;
  } else {
    existingParent.actif = true;
  }

  try {
    existingParent.save();
  } catch {
    return next(new httpError("failed to save ", 500));
  }

  res.status(200).json({ existingParent: existingParent });
};

const InscriptionParentJardin = async (req, res, next) => {
  const { IdParent, IdJardin } = req.body;

  let existingParent;

  try {
    existingParent = await parent.findById(IdParent);
  } catch {
    return next(new httpError("failed parent", 500));
  }

  let existingJardin;

  try {
    existingJardin = await jardin.findById(IdJardin);
  } catch {
    return next(new httpError("failed jardin", 500));
  }

  for (i = 0; i <= existingJardin.parents.length; i++) {
    if (existingJardin.parents[i] == IdParent) {
      return next(new httpError("inscrit deja", 500));
    }
  }

  try {
    existingJardin.parents.push(existingParent);
    existingJardin.save();
  } catch {
    return next(new httpError("failed to save ", 500));
  }

  res.status(200).json({ existingJardin: existingJardin });
};

const getParentByJardinId = async (req, res, next) => {
  const id = req.params.id;

  let existingParent;
  try {
    existingParent = await jardin.findById(id).populate("parents");
  } catch (err) {
    const error = new HttpError("Fetching failed", 500);
    return next(error);
  }

  if (!existingParent || existingParent.parents.length === 0) {
    return next(new httpError("could not find parents for this id.", 404));
  }

  res.json({
    existingParent: existingParent.parents.map((item) =>
      item.toObject({ getters: true })
    ),
  });
};

exports.signup = signup;
exports.login = login;
exports.updateParent = updateParent;
exports.deleteParent = deleteParent;
exports.getParent = getParent;
exports.getParentById = getParentById;
exports.bloquerParent = bloquerParent;
exports.InscriptionParentJardin = InscriptionParentJardin;
exports.getParentByJardinId = getParentByJardinId
