const { Router } = require('express');
const Car = require('../models/Car');

module.exports = Router()
  .post('/', async (req, res) => {
    console.log('post');
    const make = req.body.make;
    const color = req.body.color;
    console.log(make, color);
    const car = await Car.insert({ make, color });
    res.json(car);
  })
  .get('/', async (req, res) => {
    const car = await Car.getAll();
    res.json(car);
  })
  .get('/:id', async (req, res) => {
    const { id } = req.params;
    const car = await Car.getById(id);
    res.json(car);
  })
  .patch('/:id', async (req, res) => {
    const { id } = req.params;
    const car = await Car.updateById(id, req.body);
    res.json(car);
  })
  .delete('/:id', async (req, res) => {
    const { id } = req.params;
    const car = await Car.deleteById(id);
    res.json(car);
  });

