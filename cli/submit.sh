#!/bin/bash

VERSION=$(node -p "require('./package.json').version")

platform="${1:-ios}"
ext="${2:-ipa}"

echo "Submitting ${platform} build ${VERSION}.${ext}"
eas submit -p ${platform} --path="${VERSION}.${ext}"
