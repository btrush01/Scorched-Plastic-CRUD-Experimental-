// src/routes/index.js
const router = require('express').Router();

const ARMY = [
  {id: 1, name: 'Measuring Tape', description: 'Measuring Tape', img: 'img/measuring-tape.JPG'}
];

router.get('/army', function(req, res, next) {
  res.json(army);
});

router.get('/army/:armyId', function(req, res, next) {
  const {armyId} = req.params;
  // same as 'const armyId = req.params.armyId'

  const army = army.find(entry => entry.id === armyId);
  if (!army) {
    return res.status(404).end(`Could not find '${armyId}' in your army.`);
  }

  res.json(army);
});

router.post('/army', function(req, res, next) {
  const newId = '' + army.length;
  const data = req.body;
  data.id = newId;

  army.push(data);
  res.status(201).json(data);
});

router.put('/army/:armyid', function(req, res, next) {
  const { armyId } = req.params;
  const army = army.find(entry => entry.id === armyId);
  if (!army) {
    return res.status(404).end(`Could not find '${armyId}' in your army.`);
  }

  army.name = req.body.name;
  army.description = req.body.description;
  army.img = req.body.img;
  res.json(army);
});

router.delete('/army/:armyId', function (req, res, next) {
  const { armyId } = req.params;
  const army = ARMY.find(entry => entry.id === armyId);
  if (!army) {
    return res.status(404).end(`Could not find '${armyId}' in your army.`);
  }

  ARMY.splice(army.indexOf(army), 1);
  res.json(army);
});

module.exports = router;
