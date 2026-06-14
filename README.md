# accounting-js

A TypeScript-based accounting API built with Fastify and PostgreSQL.

## Tech Stack

- **Runtime:** Node.js 24
- **Framework:** Fastify 5 with Zod type provider
- **Database:** PostgreSQL 18 via Sequelize
- **Validation:** Zod 4
- **Containerization:** Docker & Docker Compose

## Prerequisites

- Node.js >= 20
- Yarn
- Docker & Docker Compose (for containerized setup)
- PostgreSQL 18 (for local development without Docker)

## Environment Variables

Copy the `.env.example` file to `.env` and configure the variables:

```bash
cp .env.example .env
```

| Variable         | Description                 | Default       |
|------------------|-----------------------------|---------------|
| `NODE_ENV`       | Environment mode            | `development` |
| `DB_HOST`        | PostgreSQL host             | `localhost`   |
| `DB_PORT`        | PostgreSQL port             | `5432`        |
| `DB_USER`        | PostgreSQL user             | `postgres`    |
| `DB_PASSWORD`    | PostgreSQL password         | `postgres`    |
| `DB_NAME`        | PostgreSQL database name    | `accounting`  |
| `DB_SSLMODE`     | PostgreSQL SSL mode         | `false`       |
| `DB_MAX_OPEN_CONNS` | Max database connections | `100`         |
| `NODE_LOG_LEVEL` | Application log level       | `info`        |

## Getting Started

### With Docker

Build and start the services:

```bash
docker compose up --build
```

The API will be available at `http://localhost:8085`.

### Without Docker

1. Install dependencies:

```bash
yarn install
```

2. Make sure PostgreSQL is running and the database from `DB_NAME` exists.

3. Start the development server:

```bash
yarn start
```

## API Endpoints

| Method | Path              | Description            |
|--------|-------------------|------------------------|
| GET    | `/`               | Redirects to OpenAPI UI |
| GET    | `/check/live`           | Liveness check         |
| GET    | `/check/ready`          | Readiness check (includes DB check) |
| GET    | `/openapi`        | OpenAPI/Swagger UI     |
| GET    | `/openapi.yaml`   | OpenAPI schema in YAML |

### Health Checks

- **`GET /live`** — Returns `{"status": "OK"}` when the server is running.
- **`GET /ready`** — Returns `{"status": "OK"}` if the database is reachable, or `{"status": "KO"}` with a 500 status if not.

## Project Structure

```
src/
├── index.ts                          # Application entry point
├── server.ts                         # Fastify server setup & routes registration
├── config/
│   ├── index.ts                      # App configuration (db, http, env, log)
│   └── db.ts                         # Database connection config per environment
├── domain/
│   └── types/                        # Shared type definitions
└── infrastructure/
    ├── db/
    │   └── index.ts                  # Database client initialization
    ├── http/
    │   └── openapi/                  # OpenAPI related utilities
    └── routes/
        └── healthcheck/
            └── index.ts              # /live and /ready endpoints
```

## Scripts

| Command           | Description                       |
|-------------------|-----------------------------------|
| `yarn start`      | Start the production server       |
| `yarn build`      | Compile TypeScript to JavaScript   |

## License

MIT