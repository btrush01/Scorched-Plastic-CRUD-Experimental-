// Load mongoose package
const mongoose = require("mongoose");

const ArmySchema = new mongoose.Schema({
  name: String,
  description: String,
  img: 'path goes here, /public/img/yourimage.png', // what to type here?
});
