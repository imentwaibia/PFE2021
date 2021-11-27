const mongoose = require("mongoose");
const schema = mongoose.Schema;

const ReclamationSchema = new schema({
  sujet: { type: String, required: true },
  description: { type: String, required: true },
  jardinId: { type: String, required: true },
  parentId: { type: String, required: true },
  finished:{type:Boolean,require:true}
});

module.exports = mongoose.model("reclamation", ReclamationSchema);