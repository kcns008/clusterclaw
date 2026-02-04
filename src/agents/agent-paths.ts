/**
 * Agent path utilities (stub for ClusterClaw)
 */

import { resolveUserPath } from "../utils.js";

export function resolveAgentDataDir(agentId?: string): string {
  return resolveUserPath(`~/.clusterclaw/agents/${agentId ?? "default"}`);
}

export function resolveAgentSessionsDir(agentId?: string): string {
  return resolveUserPath(`~/.clusterclaw/agents/${agentId ?? "default"}/sessions`);
}

export function resolveAgentContextPath(agentId?: string): string {
  return resolveUserPath(`~/.clusterclaw/agents/${agentId ?? "default"}/context.json`);
}

export function resolveOpenClawAgentDir(agentId?: string): string {
  return resolveUserPath(`~/.clusterclaw/agents/${agentId ?? "default"}`);
}

export function resolveAgentWorkspaceDir(config?: { workspaceDir?: string }): string | undefined {
  return config?.workspaceDir;
}
