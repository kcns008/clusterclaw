# 🦞 ClusterClaw — Active Kubernetes SRE Agent

<p align="center">
    <picture>
        <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/openclaw/openclaw/main/docs/assets/openclaw-logo-text-dark.png">
        <img src="https://raw.githubusercontent.com/openclaw/openclaw/main/docs/assets/openclaw-logo-text.png" alt="ClusterClaw" width="500">
    </picture>
</p>

<p align="center">
  <strong>Your AI-Powered Kubernetes & OpenShift Operations Expert</strong>
</p>

<p align="center">
  <a href="https://github.com/kcns008/clusterclaw/actions/workflows/ci.yml?branch=main"><img src="https://img.shields.io/github/actions/workflow/status/kcns008/clusterclaw/ci.yml?branch=main&style=for-the-badge" alt="CI status"></a>
  <a href="https://github.com/kcns008/clusterclaw/releases"><img src="https://img.shields.io/github/v/release/kcns008/clusterclaw?include_prereleases&style=for-the-badge" alt="GitHub release"></a>
  <a href="https://discord.gg/clawd"><img src="https://img.shields.io/discord/1456350064065904867?label=Discord&logo=discord&logoColor=white&color=5865F2&style=for-the-badge" alt="Discord"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge" alt="MIT License"></a>
</p>

**ClusterClaw** is an _Active Kubernetes SRE Agent_ — a specialized AI assistant for Kubernetes and OpenShift operations. It spins up clusters, manages workloads, performs upgrades, troubleshoots issues, and provides 24/7 operational support across all major cloud platforms.

Built on top of the powerful Clawdbot/OpenClaw framework, ClusterClaw comes pre-loaded with comprehensive Kubernetes and OpenShift skills to handle your cluster operations automatically.

## 🚀 Key Capabilities

| Operation | Support |
|-----------|----------|
| **Spin Up** | AKS, EKS, GKE, ARO, ROSA, OpenShift |
| **Manage** | Deployments, StatefulSets, Services, Ingress, Routes |
| **Upgrade** | Kubernetes 1.31.x, OpenShift 4.17.x |
| **Troubleshoot** | Pod failures, networking, storage, performance |
| **Security** | RBAC, NetworkPolicies, vulnerability scanning |
| **GitOps** | ArgoCD, Flux, Kustomize, Helm |
| **Backup/Restore** | Velero integration |

## 🛠️ Pre-Installed Skills

ClusterClaw comes with the Kubernetes skill bundle pre-installed:

- **Cluster Operations**: Upgrades, backups, node management, scaling
- **Troubleshooting**: Health checks, pod failures, network diagnostics
- **Manifest Generation**: Production-ready Deployments, Services, Ingress
- **Security**: Audits, Pod Security Standards, Trivy scanning
- **GitOps**: ArgoCD, Flux, Kustomize workflows
- **OpenShift Specific**: SCCs, Routes, Operators, ImageStreams
- **Multi-Cloud**: AKS, EKS, GKE, ARO, ROSA operations

## 📋 Quick Start

Runtime: **Node ≥22**.

```bash
npm install -g clusterclaw@latest
# or: pnpm add -g clusterclaw@latest

clusterclaw onboard --install-daemon
```

## 💬 Talk to ClusterClaw

ClusterClaw answers you on the channels you use:

- **Messaging**: WhatsApp, Telegram, Slack, Discord, Google Chat, Signal, iMessage
- **Extension**: BlueBubbles, Matrix, Zalo, Zalo Personal
- **Native**: macOS/iOS/Android voice input & output
- **UI**: Live Canvas control and WebChat

### Example Conversations

**Spin up a cluster:**
```
You: Create an AKS cluster in production rg with 3 nodes
ClusterClaw: Creating AKS cluster... Using best practices for production...
```

**Troubleshoot pod failures:**
```
You: Why is my payment-service pod crashing?
ClusterClaw: Checking pod status... CrashLoopBackOff detected. 
Analyzing logs... Error: Database connection timeout. 
Fix: Check DATABASE_HOST environment variable.
```

**Upgrade cluster:**
```
You: Upgrade my EKS cluster to version 1.31
ClusterClaw: Checking current version... 1.30.4
Updating to 1.31.0... Monitoring node pools...
```

## 🔧 Supported Platforms

| Platform | Version | Documentation |
|----------|---------|---------------|
| **Kubernetes** | 1.31.x | https://kubernetes.io/docs/ |
| **OpenShift** | 4.17.x | https://docs.openshift.com/ |
| **EKS** | 1.31 | https://docs.aws.amazon.com/eks/ |
| **AKS** | 1.31 | https://learn.microsoft.com/azure/aks/ |
| **GKE** | 1.31 | https://cloud.google.com/kubernetes-engine/docs |
| **ARO** | 4.17 | https://docs.openshift.com/aro |
| **ROSA** | 4.17 | https://docs.openshift.com/rosa |

## 🎯 Use Cases

- **DevOps Teams**: Automate routine cluster operations
- **SRE Teams**: On-call companion for incident response
- **Platform Engineers**: Standardize cluster configurations
- **Developers**: Self-service cluster management
- **Startups**: Get production-grade K8s management instantly

## 📚 Documentation & Support

- [Getting Started Guide](https://docs.openclaw.ai/start/getting-started)
- [Kubernetes Skill Documentation](skills/kubernetes/SKILL.md)
- [Discord Community](https://discord.gg/clawd)
- [Report Issues](https://github.com/kcns008/clusterclaw/issues)

## 🤝 Contributing

ClusterClaw is forked from [OpenClaw](https://github.com/openclaw/openclaw) with Kubernetes-first modifications. Contributions welcome!

1. Fork this repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

---

Built with ❤️ by the ClusterClaw team, powered by [OpenClaw](https://github.com/openclaw/openclaw)
