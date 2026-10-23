export interface TaskPlan {
  mode: "read-only-prototype";
  accepted: true;
  task: string;
  steps: string[];
  restrictions: string[];
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
  let body: { task?: unknown };
  try {
    body = await request.json() as { task?: unknown };
  } catch {
    return Response.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }
  if (typeof body.task !== "string" || body.task.trim().length === 0) {
    return Response.json({ error: "A non-empty task string is required." }, { status: 400 });
  }
  if (body.task.length > 2000) {
    return Response.json({ error: "Task must be 2000 characters or fewer." }, { status: 413 });
  }
  return Response.json(buildTaskPlan(body.task));
}
