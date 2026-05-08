#!/bin/bash

xcrun simctl boot "iPhone 16e"
npx expo run:ios --device "iPhone 16e" --no-bundler