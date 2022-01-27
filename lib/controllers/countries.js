const { Router } = require('express');
const Country = require('../models/Country');

module.exports = Router()
  .post('/', async (req, res) => {
    const { country, landmass } = req.body;
    const result = await Country.insert({ country, landmass });
    console.log(result);
    res.json(result);
  })
  .get('/', async (req, res) => {
      const result = await Country.getAll();
      res.json(result);
  });