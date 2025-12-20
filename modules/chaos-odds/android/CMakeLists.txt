cmake_minimum_required(VERSION 3.18)
project(chaos_odds)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# CRITICAL: Library name must use underscore, not hyphen
# System.loadLibrary() in Kotlin requires underscore format
set(PACKAGE_NAME "chaos_odds")

# Use standard CMake output directory - Gradle will handle packaging automatically

# Paths
set(CPP_DIR "${CMAKE_SOURCE_DIR}/../cpp")
set(RUST_LIB_DIR "${CMAKE_SOURCE_DIR}/../rust/target")

message(STATUS "ANDROID_ABI = ${ANDROID_ABI}")

# Find React Native prefab packages
# React Native 0.79+ provides prefab packages for proper linking
find_package(ReactAndroid REQUIRED CONFIG)
find_package(fbjni REQUIRED CONFIG)

message(STATUS "Found ReactAndroid prefab package (version: ${ReactAndroid_VERSION})")
message(STATUS "Found fbjni prefab package")

# In React Native 0.76+, the target name changed from reactnativejni to reactnative
if (ReactAndroid_VERSION_MINOR GREATER_EQUAL 76)
    set(REACT_NATIVE_TARGET ReactAndroid::reactnative)
    message(STATUS "Using ReactAndroid::reactnative (RN 0.76+)")
else()
    set(REACT_NATIVE_TARGET ReactAndroid::reactnativejni)
    message(STATUS "Using ReactAndroid::reactnativejni (RN < 0.76)")
endif()

# Add C++ source files
add_library(
    ${PACKAGE_NAME}
    SHARED
    ../cpp/ChaosOddsJSI.cpp
    ../cpp/common/jsi_install.cpp
    ../cpp/common/jsi_functions.cpp
    ../cpp/common/jsi_helpers.cpp
    ../cpp/common/memory_manager.cpp
    src/main/cpp/ChaosOddsJNI.cpp
)

# Include directories
# Get React Native include directories from prefab target
if (ReactAndroid_VERSION_MINOR GREATER_EQUAL 76)
    get_target_property(REACT_NATIVE_INCLUDE_DIRS
        ReactAndroid::reactnative
        INTERFACE_INCLUDE_DIRECTORIES)
else()
    get_target_property(REACT_NATIVE_INCLUDE_DIRS
        ReactAndroid::reactnativejni
        INTERFACE_INCLUDE_DIRECTORIES)
endif()

target_include_directories(
    ${PACKAGE_NAME}
    PRIVATE
    ${CPP_DIR}
    ${REACT_NATIVE_INCLUDE_DIRS}/react
    # React Native headers are provided by prefab packages
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
# Try debug first, fall back to release if debug doesn't exist
set(RUST_LIB_PATH_DEBUG "${RUST_LIB_DIR}/${RUST_TARGET}/debug/libchaos_odds.a")
set(RUST_LIB_PATH_RELEASE "${RUST_LIB_DIR}/${RUST_TARGET}/release/libchaos_odds.a")

if(EXISTS "${RUST_LIB_PATH_DEBUG}")
    set(RUST_LIB_PATH "${RUST_LIB_PATH_DEBUG}")
    message(STATUS "Using DEBUG Rust library: ${RUST_LIB_PATH}")
elseif(EXISTS "${RUST_LIB_PATH_RELEASE}")
    set(RUST_LIB_PATH "${RUST_LIB_PATH_RELEASE}")
    message(STATUS "Using RELEASE Rust library: ${RUST_LIB_PATH}")
else()
    message(FATAL_ERROR "Rust library not found. Tried:\n  ${RUST_LIB_PATH_DEBUG}\n  ${RUST_LIB_PATH_RELEASE}\nPlease run: cd modules/chaos-odds && npm run build:android:dev (for debug) or npm run build:android (for release)")
endif()

# Message already shown above with debug/release info
add_library(chaos_odds_rust STATIC IMPORTED)
set_target_properties(
    chaos_odds_rust
    PROPERTIES 
    IMPORTED_LOCATION "${RUST_LIB_PATH}"
)

# Find system libraries
find_library(log-lib log)
find_library(android-lib android)

# Link against React Native prefab targets
# ReactAndroid::jsi provides JSI symbols (jsi::Runtime, jsi::Value, etc.)
# ReactAndroid::reactnative (0.76+) or ReactAndroid::reactnativejni (<0.76) provides JNI bindings
# fbjni::fbjni provides JNI utilities
# Force load all object files from the Rust static library to ensure all symbols are included
# This is necessary because Android linker only loads .o files from static archives if there's
# an unresolved symbol reference. Similar to iOS -force_load flag.
target_link_libraries(
    ${PACKAGE_NAME}
    PRIVATE
    ReactAndroid::jsi
    ${REACT_NATIVE_TARGET}
    fbjni::fbjni
    -Wl,--whole-archive
    chaos_odds_rust
    -Wl,--no-whole-archive
    ${log-lib}
    ${android-lib}
)

# Standard compiler flags for C++ shared library
target_compile_options(
    ${PACKAGE_NAME}
    PRIVATE
    -fPIC
    -fexceptions
    -frtti
    -fvisibility=hidden
)

# Export only JNI functions, hide everything else
# This prevents symbol conflicts and ensures we use inline functions from JSI headers
# Note: JNIEXPORT and JNICALL are already defined in jni.h, we don't need to redefine them
set_target_properties(
    ${PACKAGE_NAME}
    PROPERTIES
    CXX_VISIBILITY_PRESET hidden
    VISIBILITY_INLINES_HIDDEN ON
)

# Diagnostics
message(STATUS "Using Rust lib: ${RUST_LIB_PATH}")
message(STATUS "Library name: ${PACKAGE_NAME}")
message(STATUS "Linking with ReactAndroid prefab targets")
