/**
 * Command registry (stub for ClusterClaw)
 */

import type { ProgramContext } from "./context.js";
import { Command } from "commander";
import { buildAutosearchCommand } from "../../plugins/autosearch.js";

export function registerProgramCommands(
  program: Command,
  _ctx: ProgramContext,
  _argv: string[],
): void {
  // Stub for ClusterClaw - minimal command set
  program.option("-v, --verbose", "verbose output");
  program.option("-q, --quiet", "quiet output");

  // Register autosearch command
  buildAutosearchCommand(program);
}
