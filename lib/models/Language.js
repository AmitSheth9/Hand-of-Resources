const pool = require('../utils/pool');

module.exports = class Language {
  id;
  name;
  created;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.created = row.created;
  }
  static async insert({ name, created }) {
    const { rows } = await pool.query('INSERT INTO languages (name, created) VALUES ($1, $2) RETURNING *', [name, created]);
    return new Language(rows[0]);
  }
  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM languages');
    return rows.map((row) => new Language(row));
  }
  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM languages WHERE id=$1', [id]);
    if(!rows[0]) return null;
    return new Language(rows[0]);
  }
  static async updateById(id, attributes) {
    const result = await pool.query('SELECT * FROM languages WHERE id=$1', [id]);
    const existingLanguage = result.rows[0];
    if(!existingLanguage) return null;

    const name = attributes.name ?? existingLanguage.name;
    const created = attributes.created ?? existingLanguage.created;

    const { rows } = await pool.query('UPDATE languages SET name=$2, created=$3 WHERE id=$1 RETURNING *', [id, name, created]);

    return new Language(rows[0]);
  }
  static async deleteById(id) {
    const { rows } = await pool.query('DELETE FROM languages WHERE id=$1 RETURNING *', [id]);
    if(!rows[0]) return null;
    return new Language(rows[0]);
  }
};
