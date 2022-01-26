const pool = require('../utils/pool');

module.exports = class Car {
  make;
  color;

  constructor(row) {
    this.make = row.make;
    this.color = row.color;
  }

  static async insert (make, color) {
    const { rows } = await pool.query('INSERT INTO cars (make, color) VALUES ($1, $2) RETURNING *', [make, color]);
    console.log('insert rows', rows);
    return new Car(rows[0]);
  }
};
