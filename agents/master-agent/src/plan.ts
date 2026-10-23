export interface TaskPlan {
  mode: "read-only-prototype";
  accepted: true;
  task: string;
  steps: string[];
  restrictions: string[];
}

const MAX_TASK_CHARACTERS = 2000;
const MAX_REQUEST_BYTES = 16_384;

function clientError(message: string, status: number): Response {
  return Response.json({ error: message }, {
    status,
    headers: { "Cache-Control": "no-store" }
  });
}

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
    return clientError("Content-Type must be application/json.", 415);
  }

  const declaredLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(declaredLength) && declaredLength > MAX_REQUEST_BYTES) {
    return clientError("Request body is too large.", 413);
  }

  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch {
    return clientError("Request body could not be read.", 400);
  }

  if (new TextEncoder().encode(rawBody).byteLength > MAX_REQUEST_BYTES) {
    return clientError("Request body is too large.", 413);
  }

  let body: unknown;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return clientError("Request body must be valid JSON.", 400);
  }

  if (body === null || typeof body !== "object" || Array.isArray(body)) {
    return clientError("Request body must be a JSON object.", 400);
  }

  const task = (body as { task?: unknown }).task;
  if (typeof task !== "string" || task.trim().length === 0) {
    return clientError("A non-empty task string is required.", 400);
  }
  if (task.length > MAX_TASK_CHARACTERS) {
    return clientError("Task must be 2000 characters or fewer.", 413);
  }

  return Response.json(buildTaskPlan(task), {
    headers: { "Cache-Control": "no-store" }
  });
}
