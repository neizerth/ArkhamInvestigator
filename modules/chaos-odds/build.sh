#!/bin/bash

SCRIPT_PATH=$(realpath "$0")
SCRIPT_DIR=$(dirname "$SCRIPT_PATH")

sh "$SCRIPT_DIR/cli/_build.ios.sh"
sh "$SCRIPT_DIR/cli/_build.android.sh"