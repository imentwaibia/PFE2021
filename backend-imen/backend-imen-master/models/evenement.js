const mongoose = require("mongoose");
const schema = mongoose.Schema;

const evenementSchema = new schema({
  titre: { type: String, required: true },
  date: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  jardinId: { type: String, required: true },
});

module.exports = mongoose.model("evenement", evenementSchema);