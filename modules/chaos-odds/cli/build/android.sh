#!/bin/bash
set -e

SCRIPT_PATH=$(realpath "$0")
SCRIPT_DIR=$(dirname "$SCRIPT_PATH")
RUST_DIR="$SCRIPT_DIR/../../rust"
TARGET_DIR="$RUST_DIR/target"

cd "$RUST_DIR"

RUST_TARGETS=(
  aarch64-linux-android
  armv7-linux-androideabi
  i686-linux-android
  x86_64-linux-android
)

echo "Building Rust static library for Android"
echo "Target directory: $TARGET_DIR"

for target in "${RUST_TARGETS[@]}"; do
    echo "Building Rust lib for $target"
    # link-dead-code is now in .cargo/config.toml, but we keep it here for explicit control
    # Enable mobile feature for Android builds to optimize for mobile devices
    # Use absolute path in --target-dir to override workspace target directory
    RUSTFLAGS="-C relocation-model=pic -C link-dead-code" cargo build --target "$target" --features mobile --release --target-dir "$TARGET_DIR"
done
