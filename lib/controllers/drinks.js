const { Router } = require('express');
const Drink = require('../models/Drink');

module.exports = Router()
  .post('/', async (req, res) => {
    const { drink, carbonated } = req.body;
    const result = await Drink.insert({ drink, carbonated });
    res.json(result);
  })
  .get('/', async (req, res) => {
    const result = await Drink.getAll();
    res.json(result);
  })
  .get('/:id', async (req, res) => {
    const { id } = req.params;
    const result = await Drink.getById(id);
    res.json(result);
  })
  .patch('/:id', async (req, res) => {
    const { id } = req.params;
    const result = await Drink.updateById(id, req.body);
    res.json(result);
  })
  .delete('/:id', async (req, res) => {
    const { id } = req.params;
    const result = await Drink.deleteById(id);
    res.json(result);
  });
