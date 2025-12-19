#!/bin/bash
set -e

SCRIPT_PATH=$(realpath "$0")
SCRIPT_DIR=$(dirname "$SCRIPT_PATH")
cd "$SCRIPT_DIR/../rust"

RUST_TARGETS=(
  aarch64-linux-android
  armv7-linux-androideabi
  i686-linux-android
  x86_64-linux-android
)

echo "Building Rust static library for Android (dev/debug mode)"

for target in "${RUST_TARGETS[@]}"; do
    echo "Building Rust lib for $target (debug)"
    RUSTFLAGS="-C relocation-model=pic" cargo build --target "$target"
done

