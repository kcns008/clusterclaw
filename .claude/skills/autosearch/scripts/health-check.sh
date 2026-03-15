#!/bin/bash
set -euo pipefail

NAMESPACE="${1:-default}"
LABEL="${2:-app}"
TIMEOUT="${3:-30}"

echo "Running backpressure checks for namespace: $NAMESPACE, label: $LABEL"

# Check 1: All pods are running
echo "Check 1: Pods running..."
POD_STATUS=$(kubectl get pods -n "$NAMESPACE" -l "$LABEL" -o jsonpath='{.items[*].status.phase}')
if ! echo "$POD_STATUS" | grep -q "Running"; then
  echo "ERROR: No pods in Running state"
  exit 1
fi

PENDING=$(kubectl get pods -n "$NAMESPACE" -l "$LABEL" --field-selector=status.phase=Pending -o name | wc -l)
if [ "$PENDING" -gt 0 ]; then
  echo "ERROR: $PENDING pods still pending"
  exit 1
fi

FAILED=$(kubectl get pods -n "$NAMESPACE" -l "$LABEL" --field-selector=status.phase=Failed -o name | wc -l)
if [ "$FAILED" -gt 0 ]; then
  echo "ERROR: $FAILED pods in Failed state"
  exit 1
fi

echo "✓ All pods running"

# Check 2: No restart loops
echo "Check 2: Restart loops..."
RESTARTS=$(kubectl get pods -n "$NAMESPACE" -l "$LABEL" -o json | jq -r '.items[] | select(.status.containerStatuses[].restartCount > 3) | .metadata.name' | wc -l)
if [ "$RESTARTS" -gt 0 ]; then
  echo "ERROR: $RESTARTS pods with high restart counts"
  exit 1
fi

echo "✓ No restart loops"

# Check 3: Health endpoints respond (if service exists)
SERVICE="${LABEL}"
if kubectl get svc "$SERVICE" -n "$NAMESPACE" &>/dev/null; then
  echo "Check 3: Health endpoint..."
  SERVICE_HOST="${SERVICE}.${NAMESPACE}.svc.cluster.local"
  HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "http://${SERVICE_HOST}:80/health" --connect-timeout 5 --max-time 10 || echo "000")
  if [ "$HTTP_CODE" != "200" ]; then
    echo "ERROR: Health endpoint returned $HTTP_CODE"
    exit 1
  fi
  echo "✓ Health endpoint responding"
fi

# Check 4: No OOMKilled containers
echo "Check 4: OOMKilled status..."
OOM=$(kubectl get pods -n "$NAMESPACE" -l "$LABEL" -o json | jq -r '.items[] | .status.containerStatuses[] | select(.lastState.terminated.reason == "OOMKilled") | .name' | wc -l)
if [ "$OOM" -gt 0 ]; then
  echo "ERROR: $OOM containers OOMKilled"
  exit 1
fi

echo "✓ No OOMKilled containers"

echo ""
echo "All backpressure checks passed!"
