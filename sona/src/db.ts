import { Pool } from 'pg';

const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

pool.on("connect", () => { console.log("CONNECTED TO DB"); });
pool.on("error", (err) => { console.error(err); });

export { pool };