import {Pool} from 'pg';
import * as fs from 'fs'; 
process.env.POSTGRES_DB='test';

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

const run = async (file: string) => {
  const content = fs.readFileSync(file, 'utf8');
  const statements = content.split(/\r?;/);
  for (const statement of statements) {
    if (statement) {
      await pool.query(statement);
    }
  }
};

const reset = async () => {
  await run('sql/schema.sql');
  await run('sql/data.sql');
};

const shutdown = () => {
  pool.end(() => {
    // console.log('pool has ended');
  });
};

export {pool, reset, shutdown};