#!/usr/bin/env bash

set -e

scripts/update-test-database-snapshot.sh
scripts/restore-test-database-snapshot.sh

yarn build:routes
yarn prisma generate