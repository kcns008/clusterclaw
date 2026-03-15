#!/bin/bash
set -euo pipefail

NAMESPACE="${1:-default}"
LABEL="${2:-app}"

echo "Collecting pod metrics for namespace: $NAMESPACE"

kubectl get pods -n "$NAMESPACE" -l "$LABEL" -o json | jq -r '
  .items[] | 
  .metadata.name as $pod | 
  .status.containerStatuses[]? | 
  select(.name) | 
  {
    pod: $pod,
    container: .name,
    restart_count: .restartCount,
    ready: .ready,
    state: (.state | to_entries | .[0].key)
  } 
'

echo ""
echo "Memory and CPU usage:"

for pod in $(kubectl get pods -n "$NAMESPACE" -l "$LABEL" -o jsonpath='{.items[*].metadata.name}'); do
  mem=$(kubectl top pod "$pod" -n "$NAMESPACE" --no-headers 2>/dev/null | awk '{print $2}' || echo "N/A")
  cpu=$(kubectl top pod "$pod" -n "$NAMESPACE" --no-headers 2>/dev/null | awk '{print $3}' || echo "N/A")
  echo "$pod: CPU=$cpu MEM=$mem"
done
