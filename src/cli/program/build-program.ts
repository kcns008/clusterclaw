import { Command } from "commander";
import { createProgramContext } from "./context.js";
import { registerProgramCommands } from "./command-registry.js";
import { configureProgramHelp } from "./help.js";

export function buildProgram() {
  const program = new Command();
  const ctx = createProgramContext();
  const argv = process.argv;

  configureProgramHelp(program, ctx);

  registerProgramCommands(program, ctx, argv);

  return program;
}
