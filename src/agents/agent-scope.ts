/**
 * Agent scope utilities (stub for ClusterClaw)
 */

import type { ClusterClawConfig } from "../config/config.js";
import { resolveAgentWorkspaceDir, resolveOpenClawAgentDir } from "./agent-paths.js";

export type AgentScope = {
  agentId: string;
  config: ClusterClawConfig;
};

export function resolveAgentScope(config: ClusterClawConfig, agentId?: string): AgentScope {
  return {
    agentId: agentId ?? "default",
    config,
  };
}

export function resolveDefaultAgentId(config?: ClusterClawConfig): string {
  return (config?.agents as any)?.default ?? "default";
}

export function resolveAgentConfig(config: ClusterClawConfig, agentId?: string): ClusterClawConfig {
  return config;
}

export function resolveAgentModelPrimary(config: ClusterClawConfig, agentId?: string): string {
  const model = (config as any).model ?? (config.models as any)?.default;
  return model ?? "anthropic:claude-sonnet-4-20250514";
}

export function resolveAgentDir(agentId?: string): string {
  return resolveOpenClawAgentDir(agentId);
}

export function resolveAgentModelFallbacksOverride(
  config: ClusterClawConfig,
  agentId?: string,
): string[] | undefined {
  return (config as any).modelFallbacks;
}

export function listAgentIds(config: ClusterClawConfig): string[] {
  return [resolveDefaultAgentId(config)];
}

export { resolveAgentWorkspaceDir, resolveOpenClawAgentDir };
