#!/bin/bash

SCRIPT_PATH=$(realpath "$0")
SCRIPT_DIR=$(dirname "$SCRIPT_PATH")

# Change to rust directory for cargo clean
cd "$SCRIPT_DIR/rust"
cargo clean

# Check if --dev flag is provided
if [ "$1" == "--dev" ] || [ "$1" == "-d" ]; then
    echo "Building in DEV/DEBUG mode..."
    bash "$SCRIPT_DIR/cli/build/ios.dev.sh"
    bash "$SCRIPT_DIR/cli/build/android.dev.sh"
else
    echo "Building in RELEASE mode..."
    bash "$SCRIPT_DIR/cli/build/ios.sh"
    bash "$SCRIPT_DIR/cli/build/android.sh"
fi