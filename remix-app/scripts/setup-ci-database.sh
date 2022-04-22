#!/usr/bin/env bash

set -eu

psql -q "${DATABASE_URL}" < prisma/test-database-snapshot.sql
