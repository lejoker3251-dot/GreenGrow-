import { Agent } from "agents";
import { buildTaskPlan, handlePlanRequest, type TaskPlan } from "./plan";

interface Env {
  MASTER_AGENT: DurableObjectNamespace<MasterAgent>;
  AGENT_MODE?: string;
}

export class MasterAgent extends Agent<Env> {
  async planTask(task: string): Promise<TaskPlan> {
    return buildTaskPlan(task);
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
      return handlePlanRequest(request);
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

    if (url.pathname === "/health" && request.method === "GET") {
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
