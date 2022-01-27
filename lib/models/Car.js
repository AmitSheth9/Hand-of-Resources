const pool = require('../utils/pool');

module.exports = class Car {
  id;
  make;
  color;

  constructor(row) {
    this.id = row.id;
    this.make = row.make;
    this.color = row.color;
  }

  static async insert ({ make, color }) {
    const { rows } = await pool.query('INSERT INTO cars (make, color) VALUES ($1, $2) RETURNING *', [make, color]);
    console.log('insert rows', rows);
    return new Car(rows[0]);
  }
  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM cars');
    return rows.map((row) => new Car(row));
  }
  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM cars WHERE id=$1', [id]);
    if(!rows[0]) return null;
    return new Car(rows[0]);
  }
  static async updateById(id, attributes) {
    const car = await pool.query('SELECT * FROM cars WHERE id=$1', [id]);
    const existingCar = car.rows[0];
    const make = attributes.make ?? existingCar.make;
    const color = attributes.color ?? existingCar.color;

    const { rows } = await pool.query('UPDATE cars SET make=$2, color=$3 WHERE id=$1 RETURNING *', [id, make, color]);

    return new Car(rows[0]);
  }
  static async deleteById(id) {
    const { rows } = await pool.query('DELETE FROM cars WHERE id=$1 RETURNING *', [id]);
    if(!rows[0]) return null;
    return new Car(rows[0]);
  }
};
