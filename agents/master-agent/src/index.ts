import { Agent } from "agents";
import { buildTaskPlan, handlePlanRequest, type TaskPlan } from "./plan";
import { classifyRoute } from "./routes";

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

function healthResponse(mode: string): Response {
  return Response.json({
    ok: true,
    service: "greengrow-master-agent",
    mode
  }, { headers: { "Cache-Control": "no-store" } });
}

export class MasterAgent extends Agent<Env> {
  async planTask(task: string): Promise<TaskPlan> {
    return buildTaskPlan(task);
  }

  async onRequest(request: Request): Promise<Response> {
    const decision = classifyRoute(new URL(request.url).pathname, request.method);
    if (decision.kind === "health") return healthResponse("read-only-prototype");
    if (decision.kind === "method-not-allowed") return methodNotAllowed(decision.allow);
    if (decision.kind === "plan") return handlePlanRequest(request);
    return notFound();
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const decision = classifyRoute(new URL(request.url).pathname, request.method);
    if (decision.kind === "health") {
      return healthResponse(env.AGENT_MODE ?? "read-only-prototype");
    }
    if (decision.kind === "method-not-allowed") return methodNotAllowed(decision.allow);
    if (decision.kind === "plan") {
      const id = env.MASTER_AGENT.idFromName("master-agent-prototype");
      return env.MASTER_AGENT.get(id).fetch(request);
    }
    return notFound();
  }
};
