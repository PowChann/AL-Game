# AL-Game Backend

NestJS backend for the AL-Game interactive learning demo.

## Requirements

- Node.js 22.13 or newer
- Docker with Docker Compose

## Local setup

```bash
npm install
docker compose up -d
npm run prisma:validate
npm run start:dev
```

The API listens on `http://localhost:3001` by default.

- Health check: `GET http://localhost:3001/health`
- Swagger UI: `http://localhost:3001/docs`
- OpenAPI JSON: `http://localhost:3001/docs-json`

Copy `.env.example` to `.env` when setting up a new machine. The committed example contains local-only development values.

## Validation

```bash
npm run prisma:validate
npm run lint
npm test -- --runInBand
npm run test:e2e -- --runInBand
npm run build
```

Phase 1 intentionally contains no game-domain models or migrations. Those belong to Phase 2.
