// src/routes/index.js
const router = require('express').Router();

const army = [
  {id: 1, name: 'Measuring Tape', description: 'Measuring Tape', img: 'img/measuring-tape.JPG'}
];

router.get('/army', function(req, res, next) {
  res.json(army);
});

router.get('/army/:armyId', function(req, res, next) {
  const {armyId} = req.params;
  // same as 'const armyId = req.params.armyId'

  const ARMY = army.find(entry => entry.id === armyId);
  if (!ARMY) {
    return res.status(404).end(`Could not find '${armyId}' in your army.`);
  }

  res.json(ARMY);
});

module.exports = router;
