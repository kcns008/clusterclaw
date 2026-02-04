export type SessionKeyComponents = {
  agentId?: string;
  accountId?: string;
  conversationId?: string;
};

export function buildSessionKey(components: SessionKeyComponents): string {
  const parts = [
    components.agentId ?? "default",
    components.accountId ?? "_",
    components.conversationId ?? "default",
  ];
  return parts.join(":");
}

export function parseSessionKey(key: string): SessionKeyComponents {
  const [agentId, accountId, conversationId] = key.split(":");
  return {
    agentId: agentId !== "default" ? agentId : undefined,
    accountId: accountId !== "_" ? accountId : undefined,
    conversationId: conversationId !== "default" ? conversationId : undefined,
  };
}

// Alias for backward compatibility
export const parseAgentSessionKey = parseSessionKey;

export function isSessionKey(value: unknown): value is string {
  return typeof value === "string" && value.split(":").length === 3;
}

export function normalizeAgentId(agentId?: string): string {
  return (agentId ?? "default").toLowerCase().trim();
}

export function sanitizeAgentId(agentId: string): string {
  return agentId.replace(/[^a-z0-9_-]/gi, "-").toLowerCase();
}

export function resolveAgentIdFromSessionKey(key: string): string {
  const parsed = parseSessionKey(key);
  return parsed.agentId ?? "default";
}

export function isSubagentSessionKey(key: string): boolean {
  return key.startsWith("subagent:");
}

export function normalizeAccountId(accountId?: string): string {
  return (accountId ?? "_").toLowerCase().trim();
}

export const DEFAULT_AGENT_ID = "default";
export const DEFAULT_ACCOUNT_ID = "_";
