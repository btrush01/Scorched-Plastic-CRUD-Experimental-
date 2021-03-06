// src/routes/index.js
const router = require('express').Router();

let army = require("../models/army.model.js");


// How the 4 CRUD functions interact with the server in routes
router.get('/army', function(req, res, next) {
  army.find({deleted: {$ne: true}}, function (err, army) {
    if (err) {
      console.log(err)
      return res.status(500).json(err)
    }

    res.json(army)
  })
})

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
  const armyData = {
      name: req.body.name,
      description: req.body.description,
      image: req.body.image
  };

  army.create(armyData, function(err, newArmy) {
      if (err) {
          console.error(err);
          return res.status(500).json(err);
      }

      res.json(newArmy);
  });
});

router.put('/army/:armyId', function(req, res, next) {
  const armyId = req.params.armyId;

  army.findById(armyId, function(err, army) {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }
    if (!army) {
      return res.status(404).json({message: "army not found"});
    }

    army.name = req.body.name;
    army.description = req.body.description;
    army.imge = req.body.image;

    army.save(function(err, savedarmy) {
      if (err) {
        console.error(err);
        return res.status(500).json(err);
      }
      res.json(savedarmy);
    })
  })
});

router.delete('/army/:armyId', function (req, res, next) {
  const armyId = req.params.armyId;

  army.findById(armyId, function (err, army) {
    if (err) {
      console.log(err)
      return res.status(500).json(err)
    }
    if (!army) {
      return res.status(404).json({message: 'Army not found'})
    }

    army.deleted = true

    army.save(function (err, doomedArmy) {
      res.json(doomedArmy)
    })
  })
})

module.exports = router;
