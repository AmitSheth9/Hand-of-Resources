const pool = require('../utils/pool');

module.exports = class Sport {
  id;
  sport;
  players;

  constructor(row) {
    this.id = row.id;
    this.sport = row.sport;
    this.players = row.players;
  }

  static async insert({ sport, players }) {
    const { rows } = await pool.query('INSERT INTO sports (sport, players) VALUES ($1, $2) RETURNING *', [sport, players]);
    
    return new Sport(rows[0]);
  }
  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM sports');

    return rows.map((row) => new Sport(row));
  }
  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM sports WHERE id=$1', [id]);
    if(!rows[0]) return null;
    return new Sport(rows[0]);
  }
  static async updateById(id, attributes) {
    const existingSport = await pool.query('SELECT * FROM sports WHERE id=$1', [id]);
    
    if (!existingSport) {
      const error = new Error('Sport not found');
      error.status = 404;
      throw error;
    }

    const sport = attributes.sport ?? existingSport.sport;
    const players = attributes.players ?? existingSport.players;

    const { rows } = await pool.query('UPDATE sports SET sport=$2, players=$3 WHERE id=$1 RETURNING *', [id, sport, players]);

    return new Sport(rows[0]);
  }
  static async deleteById(id) {
    const { rows } = await pool.query('DELETE FROM sports WHERE id=$1 RETURNING *', [id]);
    return new Sport(rows[0]);
  }
};
