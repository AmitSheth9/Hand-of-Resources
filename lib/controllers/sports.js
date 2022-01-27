const { Router } = require('express');
const Sport = require('../models/Sport');

module.exports = Router() 
  .post('/', async (req, res) => {
    const { sport, players } = req.body;
    const result = await Sport.insert({ sport, players });
    res.json(result);
  })
  .get('/', async (req, res) => {
    const result = await Sport.getAll();
    res.json(result);
  })
  .get('/:id', async (req, res) => {
    const { id } = req.params;
    const result = await Sport.getById(id);
    res.json(result);
  });
