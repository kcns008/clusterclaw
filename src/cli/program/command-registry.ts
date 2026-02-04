/**
 * Command registry (stub for ClusterClaw)
 */

import type { ProgramContext } from "./context.js";
import { Command } from "commander";

export function registerProgramCommands(
  program: Command,
  ctx: ProgramContext,
  argv: string[],
): void {
  // Stub for ClusterClaw - minimal command set
  program.option("-v, --verbose", "verbose output");
  program.option("-q, --quiet", "quiet output");
}
