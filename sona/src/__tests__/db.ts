import { Pool } from 'pg';
import * as fs from 'fs';
import * as path from 'path';

process.env.POSTGRES_DB = 'test';

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

const run = async (file: string) => {
  try {
    const filePath = path.resolve(__dirname, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const statements = content
      .split(/;\s*$/m)
      .map(statement => statement.trim())
      .filter(statement => statement.length > 0);

    for (const statement of statements) {
      await pool.query(statement);
    }
  } catch (error) {
    console.error(`Error running SQL file ${file}:`, error);
  }
};

const reset = async () => {
  try {
    await run('sql/schema.sql');
    await run('sql/data.sql');
  } catch (error) {
    console.error('Error resetting the database:', error);
  }
};

const shutdown = async () => {
  try {
    await pool.end();
    // console.log('pool has ended');
  } catch (error) {
    console.error('Error shutting down the pool:', error);
  }
};

export { pool, reset, shutdown };