#!/bin/bash

SCRIPT_PATH=$(realpath "$0")
SCRIPT_DIR=$(dirname "$SCRIPT_PATH")

# Check if --dev flag is provided
if [ "$1" == "--dev" ] || [ "$1" == "-d" ]; then
    echo "Building in DEV/DEBUG mode..."
    sh "$SCRIPT_DIR/cli/_build.ios.dev.sh"
    sh "$SCRIPT_DIR/cli/_build.android.dev.sh"
else
    echo "Building in RELEASE mode..."
    sh "$SCRIPT_DIR/cli/_build.ios.sh"
    sh "$SCRIPT_DIR/cli/_build.android.sh"
fi