export type MessageChannel = string;

export function isMessageChannel(value: unknown): value is string {
  return typeof value === "string";
}

// Gateway client modes for ClusterClaw (CLI-only, no messaging)
export const GATEWAY_CLIENT_MODES = ["local", "remote"] as const;
export const GATEWAY_CLIENT_NAMES = ["local", "remote"] as const;
export const INTERNAL_MESSAGE_CHANNEL = "internal" as const;

// Stub exports for deleted messaging functionality
export function isMarkdownCapableMessageChannel(channel: string): boolean {
  return true;
}

export function resolveMessageChannel(channel: string): string {
  return channel;
}

export function listDeliverableMessageChannels(): string[] {
  return [];
}

export function normalizeMessageChannel(channel: string): string {
  return channel.toLowerCase().trim();
}
