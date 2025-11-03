#!/usr/bin/env bash
set -euo pipefail

APP_NAME="gustavo-store"
IMAGE_NAME="gustavo-store"

echo "[1/3] Building Angular app into Docker image..."
docker build -t "$IMAGE_NAME" .

echo "[2/3] Stopping previous container (if any)..."
if docker ps -a --format '{{.Names}}' | grep -q "^$APP_NAME$"; then
  docker rm -f "$APP_NAME" || true
fi

echo "[3/3] Starting container on port 80..."
docker run -d --name "$APP_NAME" -p 80:80 --restart=always "$IMAGE_NAME"

echo "Deploy finished."


