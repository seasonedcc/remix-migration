#!/bin/env bash

cd legacy/api || exit 1 && bundle
cd - || exit 1
cd legacy/web || exit 1 && yarn install
cd - || exit 1
cd "remix-app" || exit 1 && yarn install && yarn build
