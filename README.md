# Knight Tactical Idle Go!

Foundation for the web-based idle tactical RPG described in the game specification.

## Stack

- Client: Vite, React, Tailwind CSS, DaisyUI, Zustand
- API: Node.js, Express
- Database: MySQL 8.0
- Local orchestration: Docker Compose

## Run with Docker

1. Copy `.env.example` to `.env` and change the local database passwords.
2. Start the stack:

   ```sh
   docker compose up --build
   ```

3. Open `http://localhost:5173`. The page shows the API connection status.
4. Check API liveness at `http://localhost:3001/api/health` and database readiness at `http://localhost:3001/api/health/ready`.

The API is published on host port `3001` by default (`API_HOST_PORT` can override it); inside Compose it still listens on port `3000`. MySQL is available to the other Compose services but is not published to the host. Its data is kept in the `mysql_data` volume.

## Run services locally

Requires Node.js 22+ and MySQL 8.0. Copy `.env.example` to `.env`, then open two terminals:

```sh
npm install
npm run dev:server
```

```sh
npm run dev:client
```

Vite proxies `/api` requests to `http://127.0.0.1:3000` by default. To run the API without MySQL, `/api/health` remains available; `/api/health/ready` reports database connectivity.

## Checks

```sh
npm test
npm run build
```

The first test verifies liveness without a database connection. The readiness test uses a stub pool; it does not require MySQL.
