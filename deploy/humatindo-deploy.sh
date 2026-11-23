#!/usr/bin/env bash
# Humatindo deploy entry point, run by GitHub Actions over SSH.
# The CI key in ~dev/.ssh/authorized_keys is locked to this script, so it can do nothing else.
# Usage (over SSH): git archive HEAD | ssh dev@server "deploy <commit-sha>"
set -euo pipefail

APP_DIR=/home/dev/humatindo
PROJECT=humatindo
CONTAINER=humatindo-web-1

req="${SSH_ORIGINAL_COMMAND:-${*:-}}"
sha="${req#deploy }"
if [[ ! "$sha" =~ ^[0-9a-f]{7,40}$ ]]; then
  echo "usage: deploy <commit-sha>" >&2
  exit 2
fi

# One deploy at a time.
exec 9>/tmp/humatindo-deploy.lock
flock -w 600 9

tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT

echo "==> Receiving source for ${sha:0:7}"
tar -x -C "$tmp"
if [[ ! -f "$tmp/docker-compose.yml" || ! -f "$tmp/Dockerfile" ]]; then
  echo "error: archive is missing docker-compose.yml or Dockerfile" >&2
  exit 1
fi

echo "==> Updating $APP_DIR"
rsync -a --delete --exclude node_modules --exclude .next "$tmp"/ "$APP_DIR"/
echo "${sha:0:7}" > "$APP_DIR/REVISION"

echo "==> Building and restarting container"
cd "$APP_DIR"
docker compose -p "$PROJECT" up -d --build --remove-orphans

echo "==> Waiting for the app to answer"
for _ in $(seq 1 30); do
  if docker exec "$CONTAINER" wget -q -O /dev/null http://127.0.0.1:3000/ 2>/dev/null; then
    docker image prune -f >/dev/null || true
    echo "==> Deployed ${sha:0:7}"
    exit 0
  fi
  sleep 2
done

echo "error: container did not respond on port 3000 after 60s" >&2
docker logs --tail 50 "$CONTAINER" >&2 || true
exit 1
