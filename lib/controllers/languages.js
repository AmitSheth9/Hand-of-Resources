const { Router } = require('express');
const Language = require('../models/Language');

module.exports = Router()
  .post('/', async (req, res) => {
    const { name, created } = req.body;
    const language = await Language.insert({ name, created });
    res.json(language);
  })
  .get('/', async (req, res) => {
    const language = await Language.getAll();
    res.json(language);
  })
  .get('/:id', async (req, res) => {
    const language = await Language.getById(req.params.id);
    res.json(language);
  })
  .patch('/:id', async (req, res) => {
    console.log(req.params, req.body);
    const language = await Language.updateById(req.params.id, req.body);
    res.json(language);
  })
  .delete('/:id', async (req, res) => {
    const language = await Language.deleteById(req.params.id);
    res.json(language);
  });
