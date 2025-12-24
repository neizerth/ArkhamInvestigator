#!/bin/bash

SCRIPT_PATH=$(realpath "$0")
SCRIPT_DIR=$(dirname "$SCRIPT_PATH")
RUST_DIR="$SCRIPT_DIR/../../rust"
TARGET_DIR="$RUST_DIR/target"   # Absolute path to target directory
cd "$RUST_DIR"

# Build the Rust library for iOS
echo "Building for iOS"

RUSTFLAGS="-C lto=no" cargo build --target aarch64-apple-ios --release --target-dir "$TARGET_DIR"
RUSTFLAGS="-C lto=no" cargo build --target aarch64-apple-ios-sim --release --target-dir "$TARGET_DIR"

# Remove old xcframework if it exists
echo "Cleaning old XCFramework"
rm -rf ../ios/chaos_odds.xcframework

echo "Creating XCFramework"

# Get workspace root (go up from rust/ to workspace root which contains Cargo.toml with [workspace])
# rust/ is at modules/chaos-odds/rust/, workspace root is at project root
DEVICE_LIB="$TARGET_DIR/aarch64-apple-ios/release/libchaos_odds.a"
SIM_LIB="$TARGET_DIR/aarch64-apple-ios-sim/release/libchaos_odds.a"

# Verify libraries exist
if [ ! -f "$DEVICE_LIB" ]; then
    echo "❌ Device library not found: $DEVICE_LIB"
    exit 1
fi
if [ ! -f "$SIM_LIB" ]; then
    echo "❌ Simulator library not found: $SIM_LIB"
    exit 1
fi

xcodebuild -create-xcframework \
  -library "$DEVICE_LIB" \
  -library "$SIM_LIB" \
  -output "$RUST_DIR/../ios/chaos_odds.xcframework"