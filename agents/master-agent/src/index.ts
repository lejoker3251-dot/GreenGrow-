import { Agent } from "agents";

interface Env {
  MASTER_AGENT: DurableObjectNamespace<MasterAgent>;
  AGENT_MODE?: string;
}

interface TaskRequest {
  task?: unknown;
}

interface TaskPlan {
  mode: "read-only-prototype";
  accepted: true;
  task: string;
  steps: string[];
  restrictions: string[];
}

export class MasterAgent extends Agent<Env> {
  async planTask(task: string): Promise<TaskPlan> {
    const normalizedTask = task.trim();

    return {
      mode: "read-only-prototype",
      accepted: true,
      task: normalizedTask,
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

  async onRequest(request: Request): Promise<Response> {
    const url = new URL(request.url);

    if (request.method === "GET" && url.pathname.endsWith("/health")) {
      return Response.json({
        ok: true,
        service: "greengrow-master-agent",
        mode: "read-only-prototype"
      });
    }

    if (request.method === "POST" && url.pathname.endsWith("/plan")) {
      let body: TaskRequest;

      try {
        body = await request.json() as TaskRequest;
      } catch {
        return Response.json({ error: "Request body must be valid JSON." }, { status: 400 });
      }

      if (typeof body.task !== "string" || body.task.trim().length === 0) {
        return Response.json({ error: "A non-empty task string is required." }, { status: 400 });
      }

      if (body.task.length > 2000) {
        return Response.json({ error: "Task must be 2000 characters or fewer." }, { status: 413 });
      }

      return Response.json(await this.planTask(body.task));
    }

    return Response.json({
      service: "greengrow-master-agent",
      mode: "read-only-prototype",
      endpoints: ["GET /health", "POST /plan"]
    });
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/health") {
      return Response.json({
        ok: true,
        service: "greengrow-master-agent",
        mode: env.AGENT_MODE ?? "read-only-prototype"
      });
    }

    if (url.pathname === "/plan" && request.method === "POST") {
      const id = env.MASTER_AGENT.idFromName("master-agent-prototype");
      return env.MASTER_AGENT.get(id).fetch(request);
    }

    return Response.json({
      service: "greengrow-master-agent",
      mode: env.AGENT_MODE ?? "read-only-prototype",
      endpoints: ["GET /health", "POST /plan"]
    });
  }
};
