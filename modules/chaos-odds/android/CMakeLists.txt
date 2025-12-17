cmake_minimum_required(VERSION 3.18)
project(chaos_odds)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_VERBOSE_MAKEFILE ON)

# Paths
set(PACKAGE_NAME "chaos-odds")
set(CPP_DIR "${CMAKE_SOURCE_DIR}/../cpp")
set(RUST_LIB_DIR "${CMAKE_SOURCE_DIR}/../rust/target")

# React Native headers path (from node_modules)
# In Expo Modules, we only need headers, not source code
if(NODE_MODULES_DIR)
    set(REACT_COMMON_DIR "${NODE_MODULES_DIR}/react-native/ReactCommon")
elseif(REACT_NATIVE_DIR)
    set(REACT_COMMON_DIR "${REACT_NATIVE_DIR}/ReactCommon")
else()
    message(FATAL_ERROR "Neither NODE_MODULES_DIR nor REACT_NATIVE_DIR is set")
endif()

# Add C++ source files
add_library(
    ${PACKAGE_NAME}
    SHARED
    ../cpp/ChaosOddsJSI.cpp
    src/main/cpp/ChaosOddsJNI.cpp
)

# Include directories
# For #include <jsi/jsi.h> to work:
#   - Add ReactCommon/jsi to include path
#   - Then jsi/jsi.h resolves to ReactCommon/jsi/jsi/jsi.h
# For #include <ReactCommon/CallInvoker.h> to work:
#   - Add ReactCommon/callinvoker to include path
target_include_directories(
    ${PACKAGE_NAME}
    PRIVATE
    ${CPP_DIR}
    "${REACT_COMMON_DIR}/jsi"
    "${REACT_COMMON_DIR}/callinvoker"
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
else()
    message(FATAL_ERROR "Unknown Android ABI: ${ANDROID_ABI}")
endif()

# Add Rust library
add_library(chaos_odds_rust STATIC IMPORTED)
set_target_properties(
    chaos_odds_rust
    PROPERTIES IMPORTED_LOCATION
    ${RUST_LIB_DIR}/${RUST_TARGET}/release/libchaos_odds.a
)

# Find system libraries
find_library(log-lib log)
find_library(android-lib android)

# Link libraries
# Note: React Native JSI libraries are linked automatically via react-android AAR
# We only need to link our Rust library and system libraries
target_link_libraries(
    ${PACKAGE_NAME}
    chaos_odds_rust
    ${log-lib}
    ${android-lib}
)

