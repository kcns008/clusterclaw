/**
 * ClusterClaw Config (stub for CLI-only mode)
 */

import type { ClusterClawConfig } from "./types.clusterclaw.js";

export type { ClusterClawConfig };

// Simple config loading for ClusterClaw CLI
export function loadConfig(): ClusterClawConfig {
  return {} as ClusterClawConfig;
}

export function saveConfig(_config: ClusterClawConfig): void {
  // Stub
}
