#!/bin/bash

SCRIPT_PATH=$(realpath "$0")
SCRIPT_DIR=$(dirname "$SCRIPT_PATH")

echo "Building Chaos Odds module"
sh "$SCRIPT_DIR/chaos-odds/build.sh"