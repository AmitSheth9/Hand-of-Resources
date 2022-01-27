const pool = require('../utils/pool');

module.exports = class Country {
  id;
  country;
  landmass;

  constructor(row) {
    this.id = row.id;
    this.country = row.country;
    this.landmass = row.landmass;
  }

  static async insert({ country, landmass }) {
    const { rows } = await pool.query('INSERT INTO countries (country, landmass) VALUES ($1, $2) RETURNING * ', [country, landmass]);
    console.log(rows);
    return new Country(rows[0]);
  }
  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM countries');
    return rows.map((row) => new Country(row));
  }
  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM countries WHERE id=$1', [id]);
    if(!rows[0]) return null;
    return new Country(rows[0]);
  }
  static async updateById(id, attributes) {
    const result = await pool.query('SELECT * FROM countries WHERE id=$1', [id]);

    const existingCountry = result.rows[0];

    const country = attributes.country ?? existingCountry.country;
    const landmass = attributes.landmass ?? existingCountry.landmass;

    const { rows } = await pool.query('UPDATE countries SET country=$2, landmass=$3 WHERE id=$1 RETURNING *', [id, country, landmass]);

    return new Country(rows[0]);
  }
  static async deleteById(id) {
    const { rows } = await pool.query('DELETE FROM countries WHERE id=$1 RETURNING *', [id]);
    if(!rows[0]) return null;

    return new Country(rows[0]);
  }
};
