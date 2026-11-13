const assert = require('node:assert/strict');
const test = require('node:test');
const { createApp } = require('../src/app');

async function withServer(app, run) {
  const server = app.listen(0, '127.0.0.1');
  await new Promise((resolve) => server.once('listening', resolve));

  try {
    const { port } = server.address();
    await run(`http://127.0.0.1:${port}`);
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => error ? reject(error) : resolve());
    });
  }
}

test('health endpoint reports the API as alive without requiring MySQL', async () => {
  await withServer(createApp({ query: async () => { throw new Error('must not query'); } }), async (baseUrl) => {
    const response = await fetch(`${baseUrl}/api/health`);
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { status: 'ok' });
  });
});

test('readiness endpoint checks the database connection', async () => {
  await withServer(createApp({ query: async () => [[{ 1: 1 }], []] }), async (baseUrl) => {
    const response = await fetch(`${baseUrl}/api/health/ready`);
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { status: 'ready' });
  });
});
