#!/bin/bash
set -euo pipefail

SERVICE="${1:-my-service}"
NAMESPACE="${2:-default}"
PORT="${3:-80}"
ENDPOINT="${4:-/health}"
REQUESTS="${5:-10}"

SERVICE_HOST="${SERVICE}.${NAMESPACE}.svc.cluster.local"

echo "Measuring API latency for: http://${SERVICE_HOST}:${PORT}${ENDPOINT}"
echo "Running ${REQUESTS} requests..."

TOTAL=0
for i in $(seq 1 "$REQUESTS"); do
  START=$(date +%s%N)
  HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "http://${SERVICE_HOST}:${PORT}${ENDPOINT}" --connect-timeout 5 --max-time 10 || echo "000")
  END=$(date +%s%N)
  
  if [ "$HTTP_CODE" = "200" ]; then
    DURATION_MS=$(( (END - START) / 1000000 ))
    TOTAL=$((TOTAL + DURATION_MS))
    echo "Request $i: ${DURATION_MS}ms (HTTP $HTTP_CODE)"
  else
    echo "Request $i: FAILED (HTTP $HTTP_CODE)"
  fi
done

if [ "$REQUESTS" -gt 0 ]; then
  AVG=$((TOTAL / REQUESTS))
  echo ""
  echo "Average latency: ${AVG}ms"
  echo "METRIC latency_ms=$AVG"
else
  echo "No successful requests"
  exit 1
fi
