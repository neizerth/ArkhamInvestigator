cmake_minimum_required(VERSION 3.18.1)
project(chaosodds)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_VERBOSE_MAKEFILE ON)

# Paths
set(PACKAGE_NAME "chaos-odds")
set(BUILD_DIR ${CMAKE_SOURCE_DIR}/build)
set(CPP_DIR "${CMAKE_SOURCE_DIR}/../cpp")
set(RUST_LIB_DIR "${CMAKE_SOURCE_DIR}/../rust/target")

# Set up React Native
find_package(ReactAndroid REQUIRED CONFIG)
find_package(fbjni REQUIRED CONFIG)

# Add C++ source files
add_library(
    ${PACKAGE_NAME}
    SHARED
    ../cpp/ChaosOddsJSI.cpp
    ../cpp/common/memory_manager.cpp
    ../cpp/common/jsi_helpers.cpp
    ../cpp/common/jsi_functions.cpp
    ../cpp/common/jsi_install.cpp
    src/main/cpp/ChaosOddsJNI.cpp
)

# Include directories
target_include_directories(
    ${PACKAGE_NAME}
    PRIVATE
    ${CPP_DIR}
    ${CPP_DIR}/common
    "${NODE_MODULES_DIR}/react-native/ReactCommon"
    "${NODE_MODULES_DIR}/react-native/ReactCommon/jsi"
    "${NODE_MODULES_DIR}/react-native/ReactCommon/callinvoker"
)

# Link Rust static library based on architecture
if(ANDROID_ABI STREQUAL "arm64-v8a")
    set(RUST_TARGET "aarch64-linux-android")
elseif(ANDROID_ABI STREQUAL "armeabi-v7a")
    set(RUST_TARGET "armv7-linux-androideabi")
elseif(ANDROID_ABI STREQUAL "x86")
    set(RUST_TARGET "i686-linux-android")
elseif(ANDROID_ABI STREQUAL "x86_64")
    set(RUST_TARGET "x86_64-linux-android")
endif()

# Add Rust library
add_library(chaos_odds_rust STATIC IMPORTED)
set_target_properties(
    chaos_odds_rust
    PROPERTIES IMPORTED_LOCATION
    ${RUST_LIB_DIR}/${RUST_TARGET}/release/libchaos_odds.a
)

# Link libraries
target_link_libraries(
    ${PACKAGE_NAME}
    chaos_odds_rust
    ReactAndroid::jsi
    ReactAndroid::reactnativejni
    fbjni::fbjni
    android
    log
)

