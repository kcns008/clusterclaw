/**
 * Environment utilities (stub for ClusterClaw)
 */

export function isTruthyEnvValue(value: string | undefined): boolean {
  if (!value) {
    return false;
  }
  return value !== "0" && value.toLowerCase() !== "false" && value.toLowerCase() !== "no";
}

export function normalizeEnv(): void {
  // Stub - environment normalization
}
