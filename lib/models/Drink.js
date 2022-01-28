const pool = require('../utils/pool');
const { insert } = require('./Country');

module.exports = class Drink {
  id;
  drink;
  carbonated;

  constructor(row) {
    this.id = row.id;
    this.drink = row.drink;
    this.carbonated = row.carbonated;
  }

  static async insert({ drink, carbonated }) {
    const { rows } = await pool.query('INSERT INTO drinks (drink, carbonated) VALUES ($1, $2) RETURNING *', [drink, carbonated]);
    return new Drink(rows[0]);
  }

};
