// src/models/army.model.js
// Load mongoose package
const mongoose = require("mongoose");

const ArmySchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
  deleted: { type: Boolean }
});

const Army = mongoose.model("Army", ArmySchema);

module.exports = Army;
