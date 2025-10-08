#!/bin/bash

VERSION=$(node -p "require('./package.json').version")

eas submit -p ios --path="${VERSION}.ipa"

