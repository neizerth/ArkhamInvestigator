import type { Box } from "@shared/model";

export const INVESTIGATORS_API_URL = process.env
	.EXPO_PUBLIC_INVESTIGATORS_API_URL as string;
export const API_URL = process.env.EXPO_PUBLIC_API_URL as string;

export const ASSET_URL = process.env.EXPO_PUBLIC_ASSET_URL as string;

/**
 * e2e build (`EXPO_PUBLIC_E2E=true`): iOS `FullWindowOverlay` content is invisible to XCUITest, so
 * Maestro cannot see modals and toasts drawn in it. The e2e build draws them in the tree instead.
 */
export const E2E = process.env.EXPO_PUBLIC_E2E === "true";

export const miniImageSize: Box = {
	width: 484,
	height: 744,
};
