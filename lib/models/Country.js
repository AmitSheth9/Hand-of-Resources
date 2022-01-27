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
     
  }
};
