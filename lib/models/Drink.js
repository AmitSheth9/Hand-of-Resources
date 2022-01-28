const pool = require('../utils/pool');

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
  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM drinks');
    return rows.map((row) => new Drink(row));
  }
  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM drinks WHERE id=$1', [id]);
    return new Drink(rows[0]);
  }
  static async updateById(id, attributes) {
    const result = await pool.query('SELECT * FROM drinks WHERE id=$1', [id]);

    const existingDrink = result.rows[0];

    if(!existingDrink) return null;

    const drink = attributes.drink ?? existingDrink.drink;
    const carbonated = attributes.carbonated ?? existingDrink.carbonated;

    const { rows } = await pool.query('UPDATE drinks SET drink=$2, carbonated=$3 WHERE id=$1 RETURNING *', [id, drink, carbonated]);
    return new Drink(rows[0]);
  }
  static async deleteById(id) {
    const { rows } = await pool.query('DELETE FROM drinks WHERE id=$1 RETURNING *', [id]);
    return new Drink(rows[0]);
  }
};
