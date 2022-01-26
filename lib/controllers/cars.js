const { Router } = require('express');
const Car = require('../models/Car');

module.exports = Router()
  .post('/', async (req, res) => {
    console.log('post');
    const make = req.body.make;
    const color = req.body.color;
    console.log(make, color);
    const resp = await Car.insert(make, color);
    res.json(resp);
  });

