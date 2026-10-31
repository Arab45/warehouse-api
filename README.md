# Warehouse Restock API

A small Node.js + Express + TypeScript REST API that reports warehouse stock levels.

## Endpoints

| Method | Path | Description |
| :--- | :--- | :--- |
| GET | `/health` | Liveness check |
| GET | `/api/inventory?status=all` | All items with count and total stock value |
| GET | `/api/inventory?status=active` | Items that are not discontinued |
| GET | `/api/inventory?status=lowStock` | Active items at or below their reorder level |

## Scripts

```bash
npm install      # install dependencies (Node 18 or newer)
npm test         # run Jest + Supertest suites
npm run lint     # ESLint, zero warnings allowed
npm run typecheck
npm run dev      # start on http://localhost:3000
```
