#!/usr/bin/env bash

set -e

DATABASE_NAME=$(psql "$DATABASE_URL" -At -c "SELECT current_database()")
TEST_DATABASE_NAME="${DATABASE_NAME}_test"

DATABASE_URL=${DATABASE_URL//${DATABASE_NAME}/${TEST_DATABASE_NAME}} $1 $2 $3 $4 $5 $6 $7 $8 $9
