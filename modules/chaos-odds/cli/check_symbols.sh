#!/bin/bash

# Script to check for FFI symbols in compiled Rust library
# Usage: ./_check_symbols.sh [symbol_name]
# If no symbol_name provided, checks for all chaos_odds symbols

set -e

# Get script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
RUST_DIR="$SCRIPT_DIR/../rust"
# rust/ is at modules/chaos-odds/rust/, workspace root is at project root
WORKSPACE_ROOT="$(cd "$RUST_DIR/../../.." && pwd)"

# Default target (can be overridden)
TARGET="${TARGET:-aarch64-apple-ios-sim}"
BUILD_TYPE="${BUILD_TYPE:-release}"

# Library path (workspace root contains target directory)
LIB_PATH="$WORKSPACE_ROOT/target/$TARGET/$BUILD_TYPE/libchaos_odds.a"

echo "🔍 Checking symbols in: $LIB_PATH"
echo "📦 Target: $TARGET"
echo "🏗️  Build type: $BUILD_TYPE"
echo ""

# Check if library exists
if [ ! -f "$LIB_PATH" ]; then
    echo "❌ Library not found: $LIB_PATH"
    echo "💡 Build the library first: cd $RUST_DIR && cargo build --target $TARGET --$BUILD_TYPE"
    exit 1
fi

# If symbol name provided, search for it specifically
if [ -n "$1" ]; then
    SYMBOL_NAME="$1"
    echo "🔎 Searching for symbol: $SYMBOL_NAME"
    echo ""
    
    # Search for exact match (with underscore prefix)
    echo "--- Exact match (with _ prefix) ---"
    nm -gU "$LIB_PATH" 2>/dev/null | grep "^[0-9a-f]* T _$SYMBOL_NAME$" || echo "❌ Not found"
    
    echo ""
    echo "--- Partial match ---"
    nm -gU "$LIB_PATH" 2>/dev/null | grep -i "$SYMBOL_NAME" || echo "❌ Not found"
    
    echo ""
    echo "--- Case-insensitive search ---"
    nm -gU "$LIB_PATH" 2>/dev/null | grep -i "$SYMBOL_NAME" || echo "❌ Not found"
else
    # Show all chaos_odds symbols
    echo "📋 All chaos_odds FFI symbols:"
    echo ""
    nm -gU "$LIB_PATH" 2>/dev/null | grep "^[0-9a-f]* T _chaos_odds" | sort || echo "❌ No symbols found"
    
    echo ""
    echo "📋 All exported symbols (including static exports):"
    echo ""
    nm -gU "$LIB_PATH" 2>/dev/null | grep -E "(CHAOS_ODDS|EXPORT|FORCE)" | head -20 || echo "❌ No exported symbols found"
    
    echo ""
    echo "📊 Symbol statistics:"
    TOTAL_SYMBOLS=$(nm -gU "$LIB_PATH" 2>/dev/null | grep "^[0-9a-f]* T " | wc -l | tr -d ' ')
    CHAOS_SYMBOLS=$(nm -gU "$LIB_PATH" 2>/dev/null | grep "^[0-9a-f]* T _chaos_odds" | wc -l | tr -d ' ')
    echo "  Total exported symbols: $TOTAL_SYMBOLS"
    echo "  chaos_odds symbols: $CHAOS_SYMBOLS"
fi

