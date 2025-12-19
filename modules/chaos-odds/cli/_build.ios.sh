#!/bin/bash

SCRIPT_PATH=$(realpath "$0")
SCRIPT_DIR=$(dirname "$SCRIPT_PATH")
cd "$SCRIPT_DIR/../rust"

# Build the Rust library for iOS
echo "Building for iOS"

RUSTFLAGS="-C lto=no" cargo build --target aarch64-apple-ios --release
RUSTFLAGS="-C lto=no" cargo build --target aarch64-apple-ios-sim --release

# Remove old xcframework if it exists
echo "Cleaning old XCFramework"
rm -rf ../ios/chaos_odds.xcframework

echo "Creating XCFramework"
xcodebuild -create-xcframework \
  -library target/aarch64-apple-ios/release/libchaos_odds.a \
  -library target/aarch64-apple-ios-sim/release/libchaos_odds.a \
  -output ../ios/chaos_odds.xcframework