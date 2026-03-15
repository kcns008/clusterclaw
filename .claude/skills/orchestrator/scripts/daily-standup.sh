#!/bin/bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_DIR="$(dirname "$SCRIPT_DIR")"

echo "📊 PLATFORM SWARM DAILY STANDUP — $(date +%Y-%m-%d)"
echo "=============================================="
echo ""

echo "## 🏥 Cluster Health"
if command -v kubectl &> /dev/null; then
  kubectl get nodes -o json 2>/dev/null | jq -r '
    .items[] | 
    "\(.metadata.name) | \(.status.nodeInfo.machineVersion) | \(.status.conditions[] | select(.type=="Ready") | .status)"
  ' 2>/dev/null || echo "  Unable to get cluster info"
else
  echo "  kubectl not available"
fi
echo ""

echo "## ✅ Completed Today"
if [ -f "$REPO_DIR/logs/LOGS.md" ]; then
  grep -E "^## " "$REPO_DIR/logs/LOGS.md" | tail -5 || echo "  No recent activity"
else
  echo "  No logs found"
fi
echo ""

echo "## 🔄 In Progress"
if [ -f "$REPO_DIR/working/WORKING.md" ]; then
  grep -E "^### " "$REPO_DIR/working/WORKING.md" | head -5 || echo "  No active tasks"
else
  echo "  No working tasks"
fi
echo ""

echo "## 🔬 Optimization Experiments"
if [ -f "$REPO_DIR/autosearch.jsonl" ]; then
  echo "  Active experiments:"
  tail -3 "$REPO_DIR/autosearch.jsonl" | while read -r line; do
    echo "    - $(echo "$line" | jq -r '.description // "Unknown"')"
  done
else
  echo "  No active experiments"
fi
echo ""

echo "## 📈 Summary"
echo "  - Last run: $(date)"
echo "  - See logs/LOGS.md for details"
