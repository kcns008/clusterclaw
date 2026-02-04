/**
 * Global state (stub for ClusterClaw)
 */

import type { ClusterClawConfig } from "./config/config.js";

export let activeConfig: ClusterClawConfig = {} as ClusterClawConfig;

export function setActiveConfig(config: ClusterClawConfig): void {
  activeConfig = config;
}

// Verbose logging flag
let verbose = false;

export function isVerbose(): boolean {
  return verbose;
}

export function setVerbose(value: boolean): void {
  verbose = value;
}

export function logVerbose(...args: unknown[]): void {
  if (verbose) {
    console.log(...args);
  }
}

// Yes flag for auto-confirmation
let yes = false;

export function isYes(): boolean {
  return yes;
}

export function setYes(value: boolean): void {
  yes = value;
}
