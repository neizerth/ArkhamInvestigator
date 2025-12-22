#!/bin/bash

SCRIPT_PATH=$(realpath "$0")
SCRIPT_DIR=$(dirname "$SCRIPT_PATH")
cd "$SCRIPT_DIR/../rust"

# Build the Rust library for iOS (dev/debug mode)
# Note: For iOS cross-compilation, we use release builds even in dev mode
# because Cargo doesn't create static libraries in debug mode for cross-compilation targets
echo "Building for iOS (dev mode - using release builds for static library)"

# Use link-dead-code to prevent linker from removing unused symbols
RUSTFLAGS="-C link-dead-code" cargo build --target aarch64-apple-ios --release
RUSTFLAGS="-C link-dead-code" cargo build --target aarch64-apple-ios-sim --release

# Remove old xcframework if it exists
echo "Cleaning old XCFramework"
rm -rf ../ios/chaos_odds.xcframework

echo "Creating XCFramework (dev mode)"
xcodebuild -create-xcframework \
  -library target/aarch64-apple-ios/release/libchaos_odds.a \
  -library target/aarch64-apple-ios-sim/release/libchaos_odds.a \
  -output ../ios/chaos_odds.xcframework

