#!/bin/bash

cd rust

# Build the Rust library for iOS
echo "Building for iOS"

cargo build --target aarch64-apple-ios --release
cargo build --target aarch64-apple-ios-sim --release
cargo build --target x86_64-apple-ios --release
