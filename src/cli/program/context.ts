/**
 * Program context (stub for ClusterClaw)
 */

import type { ClusterClawConfig } from "../../config/config.js";

export type ProgramContext = {
  config: ClusterClawConfig;
  programVersion: string;
};

export function createProgramContext(): ProgramContext {
  return {
    config: {} as ClusterClawConfig,
    programVersion: "1.0.0",
  };
}
