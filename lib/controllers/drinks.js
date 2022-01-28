const { Router } = require('express');
const Drink = require('../models/Drink');

module.exports = Router()
  .post('/', async (req, res) => {
    const { drink, carbonated } = req.body;
    const result = await Drink.insert({ drink, carbonated });
    res.json(result);
  });
