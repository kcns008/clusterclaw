/**
 * Shared utilities (stub for ClusterClaw)
 */

import { resolve as resolveTilde } from "node:path";
import { mkdirSync } from "node:fs";
import { dirname } from "node:path";

export function resolveUserPath(input: string): string {
  const home = process.env.HOME ?? process.env.USERPROFILE ?? "~";
  if (input.startsWith("~")) {
    return input.replace("~", home);
  }
  return input;
}

export function logVerbose(_message: string): void {
  // Stub - verbose logging
}

export function sanitizePath(_path: string): string {
  return _path;
}

export function sliceUtf16Safe(str: string, start: number, end?: number): string {
  // Simple UTF-16 safe slice
  return str.slice(start, end);
}

export function resolveConfigDir(): string {
  return resolveUserPath("~/.clusterclaw");
}

export const CONFIG_DIR = resolveConfigDir();

export function ensureDir(path: string): void {
  mkdirSync(path, { recursive: true });
}

export function formatTerminalLink(
  url: string,
  text?: string,
  _opts?: { fallback?: string; force?: boolean },
): string {
  return text ? `${text} (${url})` : url;
}

export function displayString(str: string): string {
  return str;
}

export { mkdirSync, dirname };
