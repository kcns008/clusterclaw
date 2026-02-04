---
summary: "Top-level overview of ClusterClaw, features, and purpose"
read_when:
  - Introducing ClusterClaw to newcomers
title: "ClusterClaw"
---

# ClusterClaw ☸️

> _"Pods are crashing? Let's fix that."_ — An SRE agent

<p align="center">
  <strong>Active Kubernetes SRE Agent — CLI-only cluster management</strong>
</p>

<p align="center">
  <a href="https://github.com/kcns008/clusterclaw">GitHub</a> ·
  <a href="https://github.com/kcns008/clusterclaw/releases">Releases</a> ·
  <a href="/">Docs</a>
</p>

**ClusterClaw** is an AI-powered Kubernetes and OpenShift operations agent. It spins up clusters, manages workloads, performs upgrades, troubleshoots issues, and provides 24/7 operational support across all major cloud platforms.

ClusterClaw is a CLI-only tool focused purely on Kubernetes and OpenShift cluster management.

## Quick Start

Runtime requirement: **Node ≥ 22**.

```bash
# Global install (npm/pnpm)
npm install -g clusterclaw@latest
# or: pnpm add -g clusterclaw@latest

# Start the agent
clusterclaw agent
```

## Supported Platforms

| Platform | Version |
|----------|---------|
| **Kubernetes** | 1.31.x |
| **OpenShift** | 4.17.x |
| **EKS** | 1.31 |
| **AKS** | 1.31 |
| **GKE** | 1.31 |
| **ARO** | 4.17 |
| **ROSA** | 4.17 |

## Key Capabilities

| Operation | Support |
|-----------|----------|
| **Spin Up** | AKS, EKS, GKE, ARO, ROSA, OpenShift |
| **Manage** | Deployments, StatefulSets, Services, Ingress, Routes |
| **Upgrade** | Kubernetes 1.31.x, OpenShift 4.17.x |
| **Troubleshoot** | Pod failures, networking, storage, performance |
| **Security** | RBAC, NetworkPolicies, vulnerability scanning |
| **GitOps** | ArgoCD, Flux, Kustomize, Helm |
| **Backup/Restore** | Velero integration |

## Pre-Installed Skills

ClusterClaw comes with Kubernetes-focused skills:

- **Kubernetes** — Core cluster operations, troubleshooting, manifests
- **GitHub** — GitOps workflows, ArgoCD, Flux, GitHub Actions
- **Coding Agent** — Generate Kubernetes manifests and configurations

## Configuration

Config lives at `~/.clusterclaw/clusterclaw.json`.

Example:

```json5
{
  model: "claude-sonnet-4-20250514",
  agents: { default: "k8s-sre" },
  skills: {
    kubernetes: { enabled: true, kubeconfig: "~/.kube/config" },
    github: { enabled: true },
  },
}
```

## Docs

- Core concepts:
  - [Agent loop](/concepts/agent-loop)
  - [Sessions](/concepts/session)
  - [Memory](/concepts/memory)
  - [Models](/concepts/models)
  - [Multi-agent](/concepts/multi-agent)
- Installation:
  - [Getting started](/install/index)
  - [Development](/install/development-channels)
  - [Docker](/install/docker)
- Reference:
  - [Testing](/reference/test)
  - [RPC](/reference/rpc)

## The Name

**ClusterClaw** — Because every cluster needs a lobster's grip.

---

_"We're all just playing with our own prompts."_ — An AI, probably high on tokens

## License

MIT — Free as a lobster in the ocean 🦞
