const express = require('express');
const defaultPool = require('./db');

function createApp(pool = defaultPool) {
  const app = express();
  app.disable('x-powered-by');
  app.use(express.json({ limit: '1mb' }));

  app.get('/api/health', (_request, response) => {
    response.json({ status: 'ok' });
  });

  app.get('/api/health/ready', async (_request, response, next) => {
    try {
      await pool.query('SELECT 1');
      response.json({ status: 'ready' });
    } catch (error) {
      next(error);
    }
  });

  app.use((error, _request, response, _next) => {
    console.error(error);
    response.status(500).json({ error: 'Internal server error' });
  });

  return app;
}

module.exports = { createApp };
