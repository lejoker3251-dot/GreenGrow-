# GreenGrow Master Agent — read-only prototype

This is an isolated Cloudflare Worker project. It is not part of the Astro Pages build and does not change the existing `greengrow` Worker or the production Pages project.

## Current scope

- `GET /health`: reports that the prototype is reachable.
- `POST /plan`: accepts a task description and returns a deterministic draft plan.
- Cloudflare Agents SDK with a Durable Object-backed `MasterAgent`.
- No model/API provider configured.
- No GitHub, Cloudflare management API, or external tools connected to an HTTP endpoint.
- No repository writes, commits, pull requests, merges, or deployments.

The plan endpoint is a scaffold, not yet an autonomous reasoning agent. A fixed-scope GitHub read provider exists in `src/github-readonly.ts`; it is deliberately not wired to any HTTP endpoint. It is pinned to `lejoker3251-dot/GreenGrow-`, branch `feature/premium-storefront-v1`, and an exact file allowlist. It requires a server-side token and limits file responses. Tests use mocked fetch responses only; no GitHub credential is configured or used by CI.

## Request safeguards

- Only `application/json` is accepted for `POST /plan`.
- The JSON body must be an object with a non-empty string `task`.
- Request bodies are limited to 16 KiB; task strings are limited to 2,000 characters.
- Malformed JSON and JSON primitives are rejected with client errors rather than uncaught exceptions.
- Unsupported paths return `404`; unsupported methods return `405` with an `Allow` header.
- Health and plan responses are marked `Cache-Control: no-store`.
- The GitHub reader uses a fixed repository and branch, exact path allowlisting, a server-side token, response size limits, and refuses redirects.

These safeguards do not replace authentication or rate limiting. Do not expose the prototype publicly until access control, rate limiting, observability, and explicit environment separation are added and reviewed.

## Local development

From this directory:

```sh
npm install
npm run typecheck
npm test
npm run dev
```

Check `GET http://localhost:8787/health`.

Example request:

```sh
curl -X POST http://localhost:8787/plan \
  -H 'content-type: application/json' \
  -d '{"task":"Summarize the current project structure"}'
```

## Environment separation

The prototype's Wrangler configuration uses the separate name `greengrow-master-agent-preview` and its own Durable Object binding. The existing Worker configuration remains named `greengrow`. Do not run a deployment command as part of routine tests.

## Deployment

Do not deploy this prototype yet. The current endpoints have no authentication and are intended for local development only. Production deployment is out of scope.
