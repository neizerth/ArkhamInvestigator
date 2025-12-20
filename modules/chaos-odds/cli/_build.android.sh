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

echo "Building Rust static library for Android"

for target in "${RUST_TARGETS[@]}"; do
    echo "Building Rust lib for $target"
    # link-dead-code is now in .cargo/config.toml, but we keep it here for explicit control
    # Enable mobile feature for Android builds to optimize for mobile devices
    RUSTFLAGS="-C relocation-model=pic -C link-dead-code" cargo build --release --target "$target" --features mobile
done
