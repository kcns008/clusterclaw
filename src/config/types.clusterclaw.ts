/**
 * ClusterClaw Core Config Types
 */

export type ClusterClawConfig = {
  meta?: {
    lastTouchedVersion?: string;
    configVersion?: number;
  };
  model?: string;
  models?: {
    default?: string;
    fallbacks?: string[];
  };
  agents?: {
    default?: string;
  };
  workspaceDir?: string;
  env?: Record<string, string>;
  plugins?: {
    load?: {
      paths?: string[];
    };
    installs?: Record<string, PluginInstallRecord>;
  };
  hooks?: {
    internal?: {
      enabled?: boolean;
    };
  };
  skills?: Record<string, unknown>;
  [key: string]: unknown;
};

export type PluginInstallRecord = {
  source: string;
  spec?: string;
  installPath?: string;
  sourcePath?: string;
  version?: string;
};
