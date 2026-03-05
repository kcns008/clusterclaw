# Skills

This repository contains the comprehensive skill set for **ClusterClaw** - an Active Kubernetes & OpenShift SRE Agent. These specialized skills enable AI agents to perform sophisticated cluster operations, diagnostics, and 24/7 operational support across all major cloud platforms.

## 🔍 QMD Skills

### Quick Markdown Search (QMD)
**Location**: [`skills/qmd.md`](skills/qmd.md)

A powerful local search engine for SRE documentation, troubleshooting guides, and operational knowledge bases. Combines BM25 keyword search, vector semantic search, and LLM re-ranking for finding critical information during incident response.

**When to Use:**
- "search my SRE documentation"
- "find troubleshooting guides"
- "retrieve operational procedures"
- "search incident response docs"

**Key Features:**
- **Fast keyword search** (`qmd search`) - Instant results during incidents
- **Semantic search** (`qmd vsearch`) - Find related issues and solutions
- **Hybrid search** (`qmd query`) - Best quality for complex problem-solving
- **Agent integration** - MCP server support for Claude Desktop/Code

**Example Usage:**
```bash
qmd search "cluster failure" -n 5
qmd vsearch "pod restart issues" 
qmd query "performance degradation" --min-score 0.4
```

## 🎯 Core SRE Skills

### Cluster Management & Operations
- **Cluster Provisioning**: Automated deployment across multi-cloud environments
- **Lifecycle Management**: Scaling, upgrades, and version migrations
- **High Availability**: Multi-master, multi-zone, and disaster recovery setups

### Advanced Diagnostics & Troubleshooting
- **Real-time Monitoring**: Live metrics collection and analysis
- **Root Cause Analysis**: Automated incident investigation and reporting
- **Performance Tuning**: Resource optimization and bottleneck identification

### Security & Compliance
- **Security Scanning**: Vulnerability assessment and penetration testing
- **Compliance Monitoring**: Policy enforcement and audit trail generation
- **Access Management**: RBAC, network policies, and security contexts

### GitOps & Continuous Operations
- **Deployment Automation**: CI/CD pipeline integration and rollout strategies
- **Configuration Management**: Infrastructure as Code and manifest management
- **Rollback Procedures**: Safe revert capabilities and disaster recovery

## 📦 Specialized Skill Categories

### Operational Excellence Skills
- **Incident Response** (`skills/incident-response/`)
- **Capacity Planning** (`skills/capacity-planning/`)
- **Cost Optimization** (`skills/cost-optimization/`)

### Advanced Automation Skills
- **Self-Healing Systems** (`skills/self-healing/`)
- **Predictive Maintenance** (`skills/predictive-maintenance/`)
- **Chaos Engineering** (`skills/chaos-engineering/`)

### Multi-Cloud Operations
- **AWS EKS Operations** (`skills/aws-eks/`)
- **Azure AKS Operations** (`skills/azure-aks/`)
- **Google GKE Operations** (`skills/google-gke/`)

### OpenShift Enterprise Skills
- **OpenShift Operators** (`skills/openshift-operators/`)
- **Enterprise Security** (`skills/enterprise-security/`)
- **Build & Pipeline** (`skills/build-pipeline/`)

## 🚀 ClusterClaw Agent Capabilities

### Active Monitoring & Alerting
- **24/7 Cluster Health Monitoring**
- **Automated Alert Routing**
- **Intelligent Alert Suppression**

### Incident Response & Resolution
- **Automated Triage and Prioritization**
- **Self-Healing Workflows**
- **Post-Incident Analysis**

### Performance & Optimization
- **Resource Utilization Analysis**
- **Automated Scaling Decisions**
- **Performance Benchmarking**

### Security & Compliance
- **Continuous Security Scanning**
- **Automated Compliance Checking**
- **Security Incident Response**

## 🔧 Integration

### With QMD Knowledge Base
1. **Install QMD** for SRE documentation search:
   ```bash
   bun install -g https://github.com/tobi/qmd
   qmd collection add /path/to/clusterclaw --name clusterclaw
   qmd embed
   ```

2. **Search operational documentation**:
   ```bash
   qmd search "incident procedure" -c clusterclaw
   qmd query "security protocol" --min-score 0.5
   ```

### With Monitoring Systems
- **Prometheus Integration**: Metrics collection and alerting
- **Grafana Dashboards**: Visualization and anomaly detection
- **Alertmanager**: Alert routing and escalation

### With CI/CD Pipelines
- **Jenkins/GitHub Actions**: Automated testing and deployment
- **ArgoCD/Flux**: GitOps workflow integration
- **Terraform/Ansible**: Infrastructure automation

## 📚 Supporting Ecosystem

### Cluster Code (CLI Tool)
AI-powered CLI for Kubernetes and OpenShift operations:
[kcns008/cluster-code](https://github.com/kcns008/cluster-code)

### Cluster Skills (Agent Skills)
Comprehensive AI agent skill collection:
[kcns008/cluster-skills](https://github.com/kcns008/cluster-skills)

### Platform Engineering Swarm
Advanced orchestration for AI agent teams:
[kcns008/cluster-agent-swarm-skills](https://github.com/kcns008/cluster-agent-swarm-skills)

## 🎯 Enterprise Use Cases

### For SRE Teams
- **Scale Operations**: Handle 100s of clusters with automated workflows
- **Improve Reliability**: 99.9%+ uptime with proactive monitoring
- **Reduce MTTR**: Faster incident resolution with AI-powered diagnostics

### For Platform Engineering
- **Standardize Operations**: Consistent processes across all environments
- **Enhance Security**: Enterprise-grade security and compliance
- **Optimize Costs**: Automated resource optimization and cost analysis

### For Cloud Operations
- **Multi-Cloud Management**: Unified operations across all cloud providers
- **Hybrid Architecture**: Seamless on-prem and cloud operations
- **Regulatory Compliance**: Automated compliance reporting and auditing

## 📖 Documentation

- [ClusterClaw Documentation](./docs/)
- [SRE Best Practices](./docs/sre-practices/)
- [Kubernetes Operations Guide](./docs/kubernetes-ops/)
- [OpenShift Enterprise Guide](./docs/openshift-enterprise/)

## 🔧 Agent Configuration

```yaml
agent:
  name: ClusterClaw
  skills:
    - name: incident-response
      priority: high
    - name: cluster-diagnostics
      priority: high
    - name: performance-optimization
      priority: medium
    - name: security-compliance
      priority: high
  integrations:
    - qmd: clusterclaw
    - monitoring: prometheus
    - ci-cd: github-actions
```

---

This comprehensive SRE skill set enables ClusterClaw to function as a fully autonomous Kubernetes and OpenShift operations expert, providing enterprise-grade reliability, security, and operational excellence across your entire infrastructure footprint.