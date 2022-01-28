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
  })
  .get('/:id', async (req, res) => {
    const { id } = req.params;
    const result = await Country.getById(id);
    res.json(result);
  })
  .patch('/:id', async (req, res) => {
    const { id } = req.params;
    const result = await Country.updateById(id, req.body);
    res.json(result);
  })
  .delete('/:id', async (req, res) => {
    const { id } = req.params;
    const result = await Country.deleteById(id);
    res.json(result);

  });
