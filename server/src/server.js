const app = require('./app').createApp();
const pool = require('./db');
const { port } = require('./config');

const server = app.listen(port, '0.0.0.0', () => {
  console.log(`API listening on port ${port}`);
});

function shutdown(signal) {
  console.log(`${signal} received; shutting down`);
  server.close((error) => {
    if (error) {
      console.error('HTTP server shutdown failed', error);
      process.exitCode = 1;
    }
    pool.end().catch((poolError) => {
      console.error('Database pool shutdown failed', poolError);
      process.exitCode = 1;
    });
  });
}

process.once('SIGINT', () => shutdown('SIGINT'));
process.once('SIGTERM', () => shutdown('SIGTERM'));
