#!/usr/bin/env sh

# Copy SSH keys for Docker builder to pull code from private repositories.
\cp -Rf ~/.ssh ./.ssh

docker build -t gennovative/event-checkin-web-admin:2.0.0 -t gennovative/event-checkin-web-admin:latest -f ./Dockerfile ..

\rm -rf ./.ssh

