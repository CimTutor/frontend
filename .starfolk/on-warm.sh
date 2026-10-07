#!/bin/bash
# On-warm for frontend: bring a fresh box to a state where work can start.
#
# Runs before anyone is assigned, as `agent`, in a login shell, with this
# environment's secrets in the environment. Keep it under three minutes and
# keep it idempotent.
#
# Leaves the CRA dev server running on $FRONTEND_PORT (default 3000). It needs
# no secrets. The backend repos mapped next to this one are not built here.
set -euo pipefail

log() { echo "[on-warm] $*"; }

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT"

FRONTEND_PORT="${FRONTEND_PORT:-3000}"
LOG_DIR="$HOME/.starfolk/logs"
DEV_LOG="$LOG_DIR/frontend-dev-server.log"
mkdir -p "$LOG_DIR"

# react-scripts 4 does not run on the image's default Node; .tool-versions pins
# the one it does run on.
log "installing pinned toolchain (.tool-versions)"
mise install
eval "$(mise env -s bash)"
log "node $(node --version), npm $(npm --version)"

# npm ci wipes node_modules, which would pull the rug from under a running dev
# server on a re-run, so only reinstall when the lockfile or Node changed.
STAMP="node_modules/.on-warm-stamp"
WANT="$(node --version) $(sha256sum package-lock.json | cut -d' ' -f1)"
if [ -f "$STAMP" ] && [ "$(cat "$STAMP")" = "$WANT" ]; then
    log "dependencies up to date, skipping npm ci"
else
    log "installing dependencies"
    npm ci --no-audit --no-fund --loglevel=error
    echo "$WANT" > "$STAMP"
fi

dev_server_up() { curl -fs -o /dev/null --max-time 5 "http://127.0.0.1:${FRONTEND_PORT}/"; }

if dev_server_up; then
    log "dev server already answering on :${FRONTEND_PORT}"
else
    log "starting dev server on :${FRONTEND_PORT} (log: $DEV_LOG)"
    BROWSER=none PORT="$FRONTEND_PORT" setsid nohup npm start > "$DEV_LOG" 2>&1 < /dev/null &
    for _ in $(seq 1 120); do
        dev_server_up && break
        sleep 1
    done
    if ! dev_server_up; then
        log "dev server did not come up within 120s; last lines of $DEV_LOG:"
        tail -n 40 "$DEV_LOG" >&2 || true
        exit 1
    fi
fi

log "ready: http://127.0.0.1:${FRONTEND_PORT}/"
