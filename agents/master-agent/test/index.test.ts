import test from "node:test";
import assert from "node:assert/strict";
import { buildTaskPlan, handlePlanRequest } from "../src/index.ts";

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
