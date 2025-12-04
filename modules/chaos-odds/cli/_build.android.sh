#!/bin/bash

cd rust

# Build the Rust library for Android
echo "Building for Android"

# Set up Android NDK linkers
export CARGO_TARGET_AARCH64_LINUX_ANDROID_LINKER=aarch64-linux-android21-clang
export CARGO_TARGET_ARMV7_LINUX_ANDROIDEABI_LINKER=armv7a-linux-androideabi21-clang
export CARGO_TARGET_X86_64_LINUX_ANDROID_LINKER=x86_64-linux-android21-clang
export CARGO_TARGET_I686_LINUX_ANDROID_LINKER=i686-linux-android21-clang

cargo build --target aarch64-linux-android --release
cargo build --target armv7-linux-androideabi --release
cargo build --target x86_64-linux-android --release
cargo build --target i686-linux-android --release