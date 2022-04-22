#!/usr/bin/env bash

set -eu

printf "Snapshoting database from %s ... " "$DATABASE_URL"

pg_dump --no-comments -sxO "$DATABASE_URL" | sed -e "s/^--.*//" -e "/^[[:space:]]*$/d" > prisma/test-database-snapshot.sql

echo "✅"