import { Agent } from "agents";
import { buildTaskPlan, handlePlanRequest, type TaskPlan } from "./plan";

interface Env {
  MASTER_AGENT: DurableObjectNamespace<MasterAgent>;
  AGENT_MODE?: string;
}

function methodNotAllowed(allow: string): Response {
  return Response.json(
    { error: "Method not allowed." },
    { status: 405, headers: { Allow: allow, "Cache-Control": "no-store" } }
  );
}

function notFound(): Response {
  return Response.json(
    { error: "Not found." },
    { status: 404, headers: { "Cache-Control": "no-store" } }
  );
}

export class MasterAgent extends Agent<Env> {
  async planTask(task: string): Promise<TaskPlan> {
    return buildTaskPlan(task);
  }

  async onRequest(request: Request): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/health") {
      if (request.method !== "GET") return methodNotAllowed("GET");
      return Response.json({
        ok: true,
        service: "greengrow-master-agent",
        mode: "read-only-prototype"
      }, { headers: { "Cache-Control": "no-store" } });
    }

    if (url.pathname === "/plan") {
      if (request.method !== "POST") return methodNotAllowed("POST");
      return handlePlanRequest(request);
    }

    return notFound();
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/health") {
      if (request.method !== "GET") return methodNotAllowed("GET");
      return Response.json({
        ok: true,
        service: "greengrow-master-agent",
        mode: env.AGENT_MODE ?? "read-only-prototype"
      }, { headers: { "Cache-Control": "no-store" } });
    }

    if (url.pathname === "/plan") {
      if (request.method !== "POST") return methodNotAllowed("POST");
      const id = env.MASTER_AGENT.idFromName("master-agent-prototype");
      return env.MASTER_AGENT.get(id).fetch(request);
    }

    return notFound();
  }
};
