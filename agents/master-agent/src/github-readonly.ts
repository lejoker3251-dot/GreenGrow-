/**
 * Fixed-scope, read-only GitHub file provider.
 *
 * This module is not wired to a public endpoint. Callers must provide a token
 * from a server-side secret store; never pass it from a request body or client.
 * All requests are pinned to one repository, one branch, and an exact path allowlist.
 */
export const GITHUB_REPOSITORY = "lejoker3251-dot/GreenGrow-";
export const GITHUB_BRANCH = "feature/premium-storefront-v1";
export const MAX_FILE_CHARACTERS = 24_000;

export const ALLOWED_PROJECT_FILES = [
  "README.md",
  "ROADMAP.md",
  "package.json",
  "astro.config.mjs",
  ".github/workflows/verify-astro.yml",
  "agents/master-agent/README.md",
  "agents/master-agent/package.json",
  "agents/master-agent/src/index.ts",
  "agents/master-agent/test/index.test.ts",
  "agents/master-agent/wrangler.jsonc",
] as const;

export type AllowedProjectFile = (typeof ALLOWED_PROJECT_FILES)[number];

export interface GitHubFile {
  path: string;
  repository: typeof GITHUB_REPOSITORY;
  branch: typeof GITHUB_BRANCH;
  content: string;
}

interface GitHubContentResponse {
  type?: string;
  path?: string;
  encoding?: string;
  content?: string;
  size?: number;
}

export class GitHubReadError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = "GitHubReadError";
  }
}

export async function readAllowedGitHubFile(
  path: string,
  token: string,
  fetchImpl: typeof fetch = fetch,
): Promise<GitHubFile> {
  if (!(ALLOWED_PROJECT_FILES as readonly string[]).includes(path)) {
    throw new GitHubReadError("File path is not allowlisted.", 403);
  }
  if (!token || token.trim().length === 0) {
    throw new GitHubReadError("A server-side GitHub read token is required.", 401);
  }

  const encodedPath = path.split("/").map(encodeURIComponent).join("/");
  const endpoint = `https://api.github.com/repos/${GITHUB_REPOSITORY}/contents/${encodedPath}?ref=${encodeURIComponent(GITHUB_BRANCH)}`;
  const response = await fetchImpl(endpoint, {
    method: "GET",
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
    },
    redirect: "error",
  });

  if (!response.ok) {
    throw new GitHubReadError("GitHub file request failed.", response.status);
  }

  const payload = await response.json() as GitHubContentResponse;
  if (payload.type !== "file" || payload.encoding !== "base64" || typeof payload.content !== "string") {
    throw new GitHubReadError("GitHub returned an unsupported file response.", 502);
  }

  const binary = atob(payload.content.replace(/\s/g, ""));
  const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
  const content = new TextDecoder().decode(bytes);
  if (content.length > MAX_FILE_CHARACTERS) {
    throw new GitHubReadError("File exceeds the configured response size limit.", 413);
  }

  return {
    path,
    repository: GITHUB_REPOSITORY,
    branch: GITHUB_BRANCH,
    content,
  };
}
