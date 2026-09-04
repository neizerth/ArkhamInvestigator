import { nativeApplicationVersion, nativeBuildVersion } from "expo-application";
import Constants from "expo-constants";
import { Platform } from "react-native";
import type { AndroidStore } from "../model/app";

export const APP_VERSION = Constants.expoConfig?.version as string;

export const APP_SCHEME = Constants.expoConfig?.scheme as string;

export const BUILD_VERSION = nativeApplicationVersion;

export const BUILD_ID = nativeBuildVersion;

export const RUSTORE_DOWNLOAD_URL = process.env
	.EXPO_PUBLIC_RUSTORE_URL as string;

export const GOOGLE_PLAY_DOWNLOAD_URL = process.env
	.EXPO_PUBLIC_GOOGLE_PLAY_URL as string;

export const APP_STORE_DOWNLOAD_URL = process.env
	.EXPO_PUBLIC_APP_STORE_URL as string;

/** GitHub Pages site that bridges shareable https links into `inv://` deeplinks. */
export const SITE_URL = process.env.EXPO_PUBLIC_SITE_URL as string;

/** Set at build time via EAS profile (`production` → google-play, `rustore` → rustore). */
export const ANDROID_STORE =
	(process.env.EXPO_PUBLIC_ANDROID_STORE as AndroidStore | undefined) ??
	"google-play";

export const ANDROID_DOWNLOAD_URL =
	ANDROID_STORE === "rustore" ? RUSTORE_DOWNLOAD_URL : GOOGLE_PLAY_DOWNLOAD_URL;

export const APP_DOWNLOAD_URL =
	Platform.OS === "android" ? ANDROID_DOWNLOAD_URL : APP_STORE_DOWNLOAD_URL;

export const DEVELOPMENT_MODE = process.env.MODE === "development" || __DEV__;
