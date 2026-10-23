# GreenGrow Master Agent — read-only prototype

This is an isolated Cloudflare Worker project. It is not part of the Astro Pages build and does not change the existing `greengrow` Worker or the production Pages project.

## Current scope

- `GET /health`: reports that the prototype is reachable.
- `POST /plan`: accepts a task description and returns a deterministic draft plan.
- Cloudflare Agents SDK with a Durable Object-backed `MasterAgent`.
- No model/API provider configured.
- No GitHub, Cloudflare management API, or external tools connected.
- No repository writes, commits, pull requests, merges, or deployments.

The plan endpoint is a scaffold, not yet an autonomous reasoning agent. The next implementation slice is to add a narrowly scoped read-only repository context provider and tests, then connect a model only after the provider and runtime behavior are verified.

## Local development

From this directory:

```sh
npm install
npm run typecheck
npm run dev
```

Check `GET http://localhost:8787/health`.

Example request:

```sh
curl -X POST http://localhost:8787/plan \
  -H 'content-type: application/json' \
  -d '{"task":"Summarize the current project structure"}'
```

## Deployment

Do not deploy this prototype yet. The current endpoints have no authentication and are intended for local development only. Before any remote preview, add access control, rate limiting, observability, and explicit environment separation. Production deployment is out of scope.
