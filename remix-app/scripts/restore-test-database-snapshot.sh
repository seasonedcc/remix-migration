#!/usr/bin/env bash

set -eu

echo "Restoring test database from prisma/test-database-snapshot.sql to ${DATABASE_URL}_test ... "

DATABASE_NAME=$(psql "$DATABASE_URL" -At -c "SELECT current_database()")
TEST_DATABASE_NAME="${DATABASE_NAME}_test"
TEST_DATABASE_URL=${DATABASE_URL//${DATABASE_NAME}/${TEST_DATABASE_NAME}}

dropdb --if-exists "${TEST_DATABASE_NAME}"
createdb "${TEST_DATABASE_NAME}"
psql -q "${TEST_DATABASE_URL}" < prisma/test-database-snapshot.sql

echo "✅"