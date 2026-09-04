#!/bin/bash

platform="${1:-ios}"
ext="${2:-ipa}"

if [[ "$platform" == "ios" ]]; then
	env_file="$(dirname "$0")/../.env.local"
	if [[ -f "$env_file" ]]; then
		set -a
		# shellcheck disable=SC1090
		source "$env_file"
		set +a
	else
		echo "Missing .env.local with EXPO_APPLE_ID and EXPO_APPLE_TEAM_ID (see .env.example)" >&2
		exit 1
	fi
fi

VERSION=$(node -p "require('./package.json').version")

echo "Submitting ${platform} build ${VERSION}.${ext}"
eas submit -p "${platform}" --path="${VERSION}.${ext}" --profile production --non-interactive
