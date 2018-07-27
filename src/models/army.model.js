// Load mongoose package
const mongoose = require("mongoose");

const ArmySchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
  deleted: { type: Boolean }
});

const Army = mongoose.model("Army", ArmySchema);

// Army.count({}, function (err, count) {
//     if (err) {
//         throw err;
//     }
//     if (count > 0) return;
//
//     const seedArmy = require("./army.seed.json");
//     Army.create(seedArmy, function (err, newArmy) {
//         if (err) {
//             throw err;
//         }
//         console.log("DB seeded")
//     });
// });

module.exports = Army;
