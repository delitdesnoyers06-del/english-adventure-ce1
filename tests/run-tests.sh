#!/bin/bash
set -e

echo "Starting HTTP server..."
npx http-server dist -p 5173 &
SERVER_PID=$!
sleep 10

echo "Running Playwright tests..."
npx playwright test

# Kill the server
echo "Stopping HTTP server..."
kill $SERVER_PID
