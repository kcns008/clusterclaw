#!/bin/bash
set -euo pipefail

MANIFEST="${1:-deployment.yaml}"
NAMESPACE="${2:-default}"
LABEL="${3:-app}"

if [ ! -f "$MANIFEST" ]; then
  echo "Error: Manifest file '$MANIFEST' not found"
  exit 1
fi

echo "Applying manifest: $MANIFEST"
kubectl apply -f "$MANIFEST"

echo "Waiting for rollout..."
START_TIME=$(date +%s)

kubectl rollout status deployment -n "$NAMESPACE" --timeout=300s

END_TIME=$(date +%s)
DURATION=$((END_TIME - START_TIME))

echo "Deployment completed in ${DURATION}s"

# Output metric for autosearch
echo "METRIC deployment_time=$DURATION"
