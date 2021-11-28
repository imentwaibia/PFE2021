const mongoose = require("mongoose");
const schema = mongoose.Schema;

const enfantSchema = new schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  Dnaissance: { type: String, required: true },
  photo: { type: String, required: true },
  parentId: { type: String, required: true },
  jardinId: { type: String, required: true },
});

module.exports = mongoose.model("enfant", enfantSchema);
