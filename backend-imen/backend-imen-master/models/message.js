//require mongoose
const mongoose = require("mongoose");
//shema
const schema = mongoose.Schema;

const messageSchema = new schema({
  text: { type: String, required: true },
  idSender: { type: String, required: true },
  idRecever: { type: String, required: true },
});

module.exports = mongoose.model("message", messageSchema);
