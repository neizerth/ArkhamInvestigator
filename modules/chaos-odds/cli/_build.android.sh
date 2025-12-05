#!/bin/bash

SCRIPT_PATH=$(realpath "$0")
SCRIPT_DIR=$(dirname "$SCRIPT_PATH")
cd "$SCRIPT_DIR/../rust"

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

echo "Copying libraries to jniLibs"
mkdir -p ../android/app/src/main/jniLibs/arm64-v8a
mkdir -p ../android/app/src/main/jniLibs/armeabi-v7a
mkdir -p ../android/app/src/main/jniLibs/x86_64
mkdir -p ../android/app/src/main/jniLibs/x86

cp target/aarch64-linux-android/release/libchaos_odds.so ../android/app/src/main/jniLibs/arm64-v8a/
cp target/armv7-linux-androideabi/release/libchaos_odds.so ../android/app/src/main/jniLibs/armeabi-v7a/
cp target/x86_64-linux-android/release/libchaos_odds.so ../android/app/src/main/jniLibs/x86_64/
cp target/i686-linux-android/release/libchaos_odds.so ../android/app/src/main/jniLibs/x86/
