#!/bin/bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_DIR="$(dirname "$SCRIPT_DIR")"

echo "🔬 Checking Autosearch Experiments"
echo "===================================="
echo ""

if [ ! -f "$REPO_DIR/autosearch.jsonl" ]; then
  echo "No autosearch experiments found."
  exit 0
fi

echo "## Running Experiments"
echo ""

TOTAL_RUNS=$(wc -l < "$REPO_DIR/autosearch.jsonl")
echo "Total runs: $TOTAL_RUNS"

echo ""
echo "## Recent Results"
tail -5 "$REPO_DIR/autosearch.jsonl" | while read -r line; do
  RUN=$(echo "$line" | jq -r '.run // "?"')
  METRIC=$(echo "$line" | jq -r '.metric // 0')
  STATUS=$(echo "$line" | jq -r '.status // "?"')
  DESC=$(echo "$line" | jq -r '.description // ""')
  
  case "$STATUS" in
    keep) ICON="✓" ;;
    discard) ICON="✗" ;;
    crash) ICON="💥" ;;
    *) ICON="?" ;;
  esac
  
  echo "  #$RUN $ICON $METRIC - $DESC"
done

echo ""
echo "## Best Results"
if command -v jq &> /dev/null; then
  BEST=$(cat "$REPO_DIR/autosearch.jsonl" | jq -s 'map(select(.status == "keep")) | max_by(.metric) | {run, metric, status, description}' 2>/dev/null)
  if [ -n "$BEST" ] && [ "$BEST" != "null" ]; then
    echo "  Best run: $(echo "$BEST" | jq -r '.run') with metric $(echo "$BEST" | jq -r '.metric')"
  fi
fi
