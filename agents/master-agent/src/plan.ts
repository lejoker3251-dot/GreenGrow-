export interface TaskPlan {
  mode: "read-only-prototype";
  accepted: true;
  task: string;
  steps: string[];
  restrictions: string[];
}

const MAX_TASK_CHARACTERS = 2000;
const MAX_REQUEST_BYTES = 16_384;

export function buildTaskPlan(task: string): TaskPlan {
  return {
    mode: "read-only-prototype",
    accepted: true,
    task: task.trim(),
    steps: [
      "Read the relevant project files and repository instructions.",
      "Describe the intended change and acceptance criteria.",
      "Identify focused tests and verification evidence.",
      "Return a proposed plan for human review."
    ],
    restrictions: [
      "No repository writes, commits, pull-request creation, or merges.",
      "No Cloudflare deployments or configuration changes.",
      "No secrets, credentials, or production data access."
    ]
  };
}

export async function handlePlanRequest(request: Request): Promise<Response> {
  const contentType = request.headers.get("content-type") ?? "";
  if (!/^application\/json(?:\s*;|\s*$)/i.test(contentType)) {
    return Response.json({ error: "Content-Type must be application/json." }, { status: 415 });
  }

  const declaredLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(declaredLength) && declaredLength > MAX_REQUEST_BYTES) {
    return Response.json({ error: "Request body is too large." }, { status: 413 });
  }

  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch {
    return Response.json({ error: "Request body could not be read." }, { status: 400 });
  }

  if (new TextEncoder().encode(rawBody).byteLength > MAX_REQUEST_BYTES) {
    return Response.json({ error: "Request body is too large." }, { status: 413 });
  }

  let body: unknown;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return Response.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  if (body === null || typeof body !== "object" || Array.isArray(body)) {
    return Response.json({ error: "Request body must be a JSON object." }, { status: 400 });
  }

  const task = (body as { task?: unknown }).task;
  if (typeof task !== "string" || task.trim().length === 0) {
    return Response.json({ error: "A non-empty task string is required." }, { status: 400 });
  }
  if (task.length > MAX_TASK_CHARACTERS) {
    return Response.json({ error: "Task must be 2000 characters or fewer." }, { status: 413 });
  }

  return Response.json(buildTaskPlan(task), {
    headers: { "Cache-Control": "no-store" }
  });
}
