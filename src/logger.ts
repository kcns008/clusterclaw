/**
 * Logger (stub for ClusterClaw)
 */

export type LogLevel = "debug" | "info" | "warn" | "error";

export function createLogger(_name: string) {
  return {
    debug: console.debug,
    info: console.info,
    warn: console.warn,
    error: console.error,
  };
}

export const log = createLogger("clusterclaw");
