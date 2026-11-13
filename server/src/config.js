const path = require('node:path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

function positiveInteger(value, fallback, name) {
  const parsed = Number(value ?? fallback);
  if (!Number.isInteger(parsed) || parsed < 1) {
    throw new Error(`${name} must be a positive integer`);
  }
  return parsed;
}

const config = {
  port: positiveInteger(process.env.PORT, 3000, 'PORT'),
  database: {
    host: process.env.DB_HOST || '127.0.0.1',
    port: positiveInteger(process.env.DB_PORT, 3306, 'DB_PORT'),
    user: process.env.DB_USER || 'knight_app',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'knight_tactical_idle',
  },
};

module.exports = config;
