import test from "node:test";
import assert from "node:assert/strict";
import { buildTaskPlan, handlePlanRequest } from "../src/plan.ts";

test("health-style plan metadata stays read-only", () => {
  const plan = buildTaskPlan("  Inspect project structure  ");
  assert.equal(plan.mode, "read-only-prototype");
  assert.equal(plan.task, "Inspect project structure");
  assert.equal(plan.accepted, true);
  assert.ok(plan.restrictions.some((item) => item.includes("No repository writes")));
});

test("valid plan request returns a structured plan", async () => {
  const response = await handlePlanRequest(new Request("https://worker.test/plan", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ task: "Review project structure" })
  }));
  assert.equal(response.status, 200);
  const result = await response.json() as { task: string; mode: string; steps: string[] };
  assert.equal(result.task, "Review project structure");
  assert.equal(result.mode, "read-only-prototype");
  assert.ok(result.steps.length > 0);
});

test("invalid JSON returns 400", async () => {
  const response = await handlePlanRequest(new Request("https://worker.test/plan", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: "{"
  }));
  assert.equal(response.status, 400);
  assert.equal(response.headers.get("cache-control"), "no-store");
});

test("missing or blank task returns 400", async () => {
  for (const body of [{}, { task: "   " }, { task: 123 }]) {
    const response = await handlePlanRequest(new Request("https://worker.test/plan", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body)
    }));
    assert.equal(response.status, 400);
  }
});

test("oversized task returns 413", async () => {
  const response = await handlePlanRequest(new Request("https://worker.test/plan", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ task: "x".repeat(2001) })
  }));
  assert.equal(response.status, 413);
});


test("GitHub read provider requests only an allowlisted file on the fixed branch", async () => {
  const { readAllowedGitHubFile, GITHUB_BRANCH, GITHUB_REPOSITORY } = await import("../src/github-readonly.ts");
  let requestedUrl = "";
  let requestedInit: RequestInit | undefined;
  const mockFetch: typeof fetch = async (input, init) => {
    requestedUrl = String(input);
    requestedInit = init;
    return Response.json({
      type: "file",
      encoding: "base64",
      content: btoa("# test README"),
      path: "README.md"
    });
  };

  const result = await readAllowedGitHubFile("README.md", "test-token", mockFetch);
  assert.equal(result.content, "# test README");
  assert.equal(result.repository, GITHUB_REPOSITORY);
  assert.equal(result.branch, GITHUB_BRANCH);
  assert.ok(requestedUrl.includes("/repos/lejoker3251-dot/GreenGrow-/contents/README.md?ref=feature%2Fpremium-storefront-v1"));
  assert.equal(requestedInit?.method, "GET");
  assert.equal(new Headers(requestedInit?.headers).get("authorization"), "Bearer test-token");
});

test("GitHub read provider rejects arbitrary paths before making a request", async () => {
  const { readAllowedGitHubFile } = await import("../src/github-readonly.ts");
  let called = false;
  const mockFetch: typeof fetch = async () => {
    called = true;
    return Response.json({});
  };
  await assert.rejects(
    readAllowedGitHubFile("../../.env", "test-token", mockFetch),
    /allowlisted/
  );
  assert.equal(called, false);
});

test("GitHub read provider requires a token and does not call GitHub without one", async () => {
  const { readAllowedGitHubFile } = await import("../src/github-readonly.ts");
  let called = false;
  const mockFetch: typeof fetch = async () => {
    called = true;
    return Response.json({});
  };
  await assert.rejects(readAllowedGitHubFile("README.md", "", mockFetch), /token is required/);
  assert.equal(called, false);
});

test("GitHub read provider rejects oversized file contents", async () => {
  const { readAllowedGitHubFile, MAX_FILE_CHARACTERS } = await import("../src/github-readonly.ts");
  const mockFetch: typeof fetch = async () => Response.json({
    type: "file",
    encoding: "base64",
    content: btoa("x".repeat(MAX_FILE_CHARACTERS + 1)),
  });
  await assert.rejects(readAllowedGitHubFile("README.md", "test-token", mockFetch), /size limit/);
});


test("GitHub read provider rejects oversized declared byte size before decoding", async () => {
  const { readAllowedGitHubFile, MAX_FILE_BYTES } = await import("../src/github-readonly.ts");
  const mockFetch: typeof fetch = async () => Response.json({
    type: "file",
    encoding: "base64",
    size: MAX_FILE_BYTES + 1,
    content: btoa("small"),
  });
  await assert.rejects(readAllowedGitHubFile("README.md", "test-token", mockFetch), /byte size limit/);
});

test("GitHub read provider rejects oversized encoded payload before base64 decoding", async () => {
  const { readAllowedGitHubFile, MAX_BASE64_CHARACTERS } = await import("../src/github-readonly.ts");
  let decodedPayloadReturned = false;
  const mockFetch: typeof fetch = async () => {
    decodedPayloadReturned = true;
    return Response.json({
      type: "file",
      encoding: "base64",
      content: "A".repeat(MAX_BASE64_CHARACTERS + 4),
    });
  };
  await assert.rejects(readAllowedGitHubFile("README.md", "test-token", mockFetch), /Encoded file exceeds/);
  assert.equal(decodedPayloadReturned, true);
});


test("JSON primitives and null are rejected without throwing", async () => {
  for (const body of ["null", "[]", "123", "\"text\""]) {
    const response = await handlePlanRequest(new Request("https://worker.test/plan", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body
    }));
    assert.equal(response.status, 400);
  }
});

test("wrong content type returns 415", async () => {
  const response = await handlePlanRequest(new Request("https://worker.test/plan", {
    method: "POST",
    headers: { "content-type": "text/plain" },
    body: JSON.stringify({ task: "Review project structure" })
  }));
  assert.equal(response.status, 415);
  assert.equal(response.headers.get("cache-control"), "no-store");
});

test("oversized request body returns 413 even when task field is not reached", async () => {
  const response = await handlePlanRequest(new Request("https://worker.test/plan", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ other: "x".repeat(17_000) })
  }));
  assert.equal(response.status, 413);
});

test("successful plan responses are not cacheable", async () => {
  const response = await handlePlanRequest(new Request("https://worker.test/plan", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ task: "Review project structure" })
  }));
  assert.equal(response.headers.get("cache-control"), "no-store");
});

test("GitHub reader rejects redirects instead of following them", async () => {
  const { readAllowedGitHubFile } = await import("../src/github-readonly.ts");
  let requestedInit: RequestInit | undefined;
  const mockFetch: typeof fetch = async (_input, init) => {
    requestedInit = init;
    return Response.json({ type: "file", encoding: "base64", content: btoa("ok") });
  };
  await readAllowedGitHubFile("README.md", "test-token", mockFetch);
  assert.equal(requestedInit?.redirect, "error");
});

test("GitHub reader rejects unexpected response shapes", async () => {
  const { readAllowedGitHubFile } = await import("../src/github-readonly.ts");
  const mockFetch: typeof fetch = async () => Response.json({
    type: "dir",
    encoding: "base64",
    content: btoa("not a file")
  });
  await assert.rejects(readAllowedGitHubFile("README.md", "test-token", mockFetch), /unsupported file response/);
});



test("route classification allows only the documented methods", async () => {
  const { classifyRoute } = await import("../src/routes.ts");
  assert.deepEqual(classifyRoute("/health", "GET"), { kind: "health" });
  assert.deepEqual(classifyRoute("/health", "POST"), { kind: "method-not-allowed", allow: "GET" });
  assert.deepEqual(classifyRoute("/plan", "POST"), { kind: "plan" });
  assert.deepEqual(classifyRoute("/plan", "GET"), { kind: "method-not-allowed", allow: "POST" });
  assert.deepEqual(classifyRoute("/unexpected", "GET"), { kind: "not-found" });
  assert.deepEqual(classifyRoute("/plan/extra", "POST"), { kind: "not-found" });
});
