const { Pool } = require("pg");
require("dotenv/config");

const postgresUser = process.env.POSTGRES_USER;
const postgresHost = process.env.POSTGRES_HOST;
const postgresPort = process.env.POSTGRES_PORT;
const postgresDatabase = process.env.POSTGRES_DATABASE;
const postgresPassword = process.env.POSTGRES_PASSWORD;

const pool = new Pool({
  host: postgresHost,
  database: postgresDatabase,
  password: postgresPassword,
  port: postgresPort,
  user: postgresUser,
});

class Postgres {
  async fetch(SQL, ...args) {
    const clien = await pool.connect();

    try {
      const {
        rows: [row],
      } = await clien.query(SQL, args);

      return row;
    } catch (error) {
      console.log("postgres error: ", error.message);
    } finally {
      clien.release();
    }
  }

  async fetchAll(SQL, ...args) {
    const clien = await pool.connect();

    try {
      const { rows } = await clien.query(SQL, args);

      return rows;
    } catch (error) {
      console.log("postgres error: ", error.message);
    } finally {
      clien.release();
    }
  }
}

module.exports = { Postgres };
