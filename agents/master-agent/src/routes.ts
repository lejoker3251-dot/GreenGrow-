export type RouteDecision =
  | { kind: "health" }
  | { kind: "plan" }
  | { kind: "method-not-allowed"; allow: "GET" | "POST" }
  | { kind: "not-found" };

export function classifyRoute(pathname: string, method: string): RouteDecision {
  if (pathname === "/health") {
    return method === "GET"
      ? { kind: "health" }
      : { kind: "method-not-allowed", allow: "GET" };
  }
  if (pathname === "/plan") {
    return method === "POST"
      ? { kind: "plan" }
      : { kind: "method-not-allowed", allow: "POST" };
  }
  return { kind: "not-found" };
}
