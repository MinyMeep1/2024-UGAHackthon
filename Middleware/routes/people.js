const express = require('express');
const router = express.Router();
const people = require('../services/people');

/* GET people */
router.get('/', async function(req, res, next) {
  try {
    res.json(await people.getAll());
  } catch (err) {
    console.error(`Error while getting people`, err.message);
    next(err);
  }
});

/* GET peson by ID */
router.get('/:id', async function(req, res, next) {
  try {
    res.json(await people.search(req.params.id));
  } catch (err) {
    console.error(`Error while searching people`, err.message);
    next(err);
  }
});

/* POST person */
router.post('/', async function(req, res, next) {
  try {
    res.json(await people.create(req.body));
  } catch (err) {
    console.error(`Error while adding person`, err.message);
    next(err);
  }
});


module.exports = router;