#!/bin/bash

cd rust

# Build the Rust library for iOS
echo "Building for iOS"

cargo build --target aarch64-apple-ios --release
cargo build --target aarch64-apple-ios-sim --release
cargo build --target x86_64-apple-ios --release

echo "Creating XCFramework"
xcodebuild -create-xcframework \
  -library target/aarch64-apple-ios/release/libchaos_odds.a \
  -library target/aarch64-apple-ios-sim/release/libchaos_odds.a \
  -output ../ios/chaos_odds.xcframework