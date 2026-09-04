#!/bin/bash
# Upload a local APK to RuStore via Public API and submit the draft for moderation.
#
# Flow:
#   1. POST /public/auth/                         — JWE token (keyId + RSA signature)
#   2. POST /public/v1/application/{pkg}/version  — create draft
#   3. POST .../version/{id}/apk                  — multipart APK upload
#   4. POST .../version/{id}/commit               — submit for moderation
#
# Credentials (.env.local, see .env.example):
#   RUSTORE_KEY_ID
#   RUSTORE_PRIVATE_KEY_PATH  — path to PEM private key
#   (or RUSTORE_PRIVATE_KEY)  — PEM contents
#
# Optional:
#   RUSTORE_PACKAGE_NAME   (default: com.arkhaminvestigator)
#   RUSTORE_APP_NAME       (default: Investigator)
#   RUSTORE_PUBLISH_TYPE   (default: MANUAL — INSTANTLY | MANUAL | DELAYED)
#   RUSTORE_WHATS_NEW      (default: "Release <version>")
#
# Usage:
#   sh ./cli/submit-rustore.sh [path-to.apk]

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

env_file="$ROOT/.env.local"
if [[ -f "$env_file" ]]; then
	set -a
	# shellcheck disable=SC1090
	source "$env_file"
	set +a
fi

VERSION=$(node -p "require('./package.json').version")
APK_PATH="${1:-${VERSION}.apk}"
PACKAGE_NAME="${RUSTORE_PACKAGE_NAME:-com.arkhaminvestigator}"
APP_NAME="${RUSTORE_APP_NAME:-Investigator}"
PUBLISH_TYPE="${RUSTORE_PUBLISH_TYPE:-MANUAL}"
WHATS_NEW="${RUSTORE_WHATS_NEW:-Release ${VERSION}}"
API_BASE="https://public-api.rustore.ru"

die() {
	echo "$*" >&2
	exit 1
}

require_cmd() {
	command -v "$1" >/dev/null 2>&1 || die "Missing required command: $1"
}

require_cmd curl
require_cmd jq
require_cmd openssl
require_cmd python3

[[ -n "${RUSTORE_KEY_ID:-}" ]] || die "Missing RUSTORE_KEY_ID in .env.local (see .env.example)"

KEY_FILE=""
CLEANUP_KEY=0
cleanup() {
	if [[ "$CLEANUP_KEY" -eq 1 && -n "$KEY_FILE" && -f "$KEY_FILE" ]]; then
		rm -f "$KEY_FILE"
	fi
}
trap cleanup EXIT

if [[ -n "${RUSTORE_PRIVATE_KEY_PATH:-}" ]]; then
	[[ -f "$RUSTORE_PRIVATE_KEY_PATH" ]] || die "RUSTORE_PRIVATE_KEY_PATH not found: $RUSTORE_PRIVATE_KEY_PATH"
	KEY_FILE="$RUSTORE_PRIVATE_KEY_PATH"
elif [[ -n "${RUSTORE_PRIVATE_KEY:-}" ]]; then
	KEY_FILE=$(mktemp)
	CLEANUP_KEY=1
	# Support both real newlines and literal \n pasted into .env.local
	printf '%s\n' "$RUSTORE_PRIVATE_KEY" | sed 's/\\n/\n/g' >"$KEY_FILE"
	chmod 600 "$KEY_FILE"
else
	die "Missing RUSTORE_PRIVATE_KEY_PATH or RUSTORE_PRIVATE_KEY in .env.local (see .env.example)"
fi

[[ -f "$APK_PATH" ]] || die "APK not found: $APK_PATH (build with npm run build:rustore first)"

# macOS date lacks %3N / %:z — use Python for ISO-8601 with ms + offset
TIMESTAMP=$(python3 -c 'from datetime import datetime; print(datetime.now().astimezone().isoformat(timespec="milliseconds"))')

# SHA512withRSA over keyId+timestamp (no separator), base64 without wrapping
SIGNATURE=$(
	printf '%s%s' "$RUSTORE_KEY_ID" "$TIMESTAMP" \
		| openssl dgst -sha512 -sign "$KEY_FILE" \
		| base64 \
		| tr -d '\n'
)
[[ -n "$SIGNATURE" ]] || die "Failed to sign auth payload — check RUSTORE private key PEM"

echo "Submitting RuStore build ${APK_PATH} (v${VERSION})"

api_post() {
	# Usage: api_post <label> <max_time> <url> [curl args...]
	# Sets HTTP_CODE and BODY_FILE; does not use curl -f so bodies stay readable on errors.
	local label="$1"
	local max_time="$2"
	local url="$3"
	shift 3

	BODY_FILE=$(mktemp)
	local curl_exit=0
	set +e
	HTTP_CODE=$(
		curl -sS --connect-timeout 10 --max-time "$max_time" \
			-o "$BODY_FILE" -w "%{http_code}" \
			-X POST "$url" "$@"
	)
	curl_exit=$?
	set -e

	echo "${label} HTTP ${HTTP_CODE}"
	echo "${label} response: $(cat "$BODY_FILE")"

	if [[ "$curl_exit" -ne 0 ]]; then
		rm -f "$BODY_FILE"
		die "${label} request failed (curl exit ${curl_exit})"
	fi
	if [[ "$HTTP_CODE" -ge 400 ]]; then
		local body
		body=$(cat "$BODY_FILE")
		rm -f "$BODY_FILE"
		die "${label} failed (HTTP ${HTTP_CODE}): ${body}"
	fi
}

# --- 1. Auth ---
api_post "Auth" 60 "${API_BASE}/public/auth/" \
	-H "Content-Type: application/json" \
	-d "$(jq -n --arg k "$RUSTORE_KEY_ID" --arg t "$TIMESTAMP" --arg s "$SIGNATURE" \
		'{keyId: $k, timestamp: $t, signature: $s}')"

JWE=$(jq -r '.body.jwe // empty' "$BODY_FILE")
TTL=$(jq -r '.body.ttl // empty' "$BODY_FILE")
rm -f "$BODY_FILE"
[[ -n "$JWE" ]] || die "Auth OK but no JWE token in response"
echo "JWE token acquired (TTL: ${TTL:-?}s)"

# --- 2. Create draft ---
api_post "Create draft" 60 \
	"${API_BASE}/public/v1/application/${PACKAGE_NAME}/version" \
	-H "Content-Type: application/json" \
	-H "Public-Token: ${JWE}" \
	-d "$(jq -n --arg name "$APP_NAME" --arg pt "$PUBLISH_TYPE" --arg wn "$WHATS_NEW" \
		'{appName: $name, appType: "MAIN", publishType: $pt, whatsNew: $wn}')"

# body may be a scalar version id or an object
VERSION_ID=$(jq -r '
	.body
	| if type == "object" then (.versionId // .version_id // .id // empty)
	  else .
	  end
' "$BODY_FILE")
rm -f "$BODY_FILE"

if [[ -z "$VERSION_ID" || "$VERSION_ID" == "null" ]]; then
	die "Create draft returned no versionId (delete unfinished drafts in RuStore Console if one already exists)"
fi
echo "Draft created: versionId=${VERSION_ID}"

# --- 3. Upload APK ---
api_post "Upload APK" 600 \
	"${API_BASE}/public/v1/application/${PACKAGE_NAME}/version/${VERSION_ID}/apk?servicesType=Unknown&isMainApk=true" \
	-H "Public-Token: ${JWE}" \
	-F "file=@${APK_PATH}"

UPLOAD_CODE=$(jq -r '.code // empty' "$BODY_FILE")
rm -f "$BODY_FILE"
[[ "$UPLOAD_CODE" == "OK" ]] || die "APK upload returned code=${UPLOAD_CODE:-empty} (expected OK)"
echo "APK uploaded"

# --- 4. Commit for moderation ---
api_post "Commit" 60 \
	"${API_BASE}/public/v1/application/${PACKAGE_NAME}/version/${VERSION_ID}/commit?priorityUpdate=0" \
	-H "Public-Token: ${JWE}"

COMMIT_CODE=$(jq -r '.code // empty' "$BODY_FILE")
rm -f "$BODY_FILE"
[[ "$COMMIT_CODE" == "OK" ]] || die "Commit returned code=${COMMIT_CODE:-empty} (expected OK)"

echo "✓ RuStore upload complete — versionId=${VERSION_ID} submitted for moderation (publishType=${PUBLISH_TYPE})"
