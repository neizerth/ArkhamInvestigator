import { nativeApplicationVersion, nativeBuildVersion } from "expo-application";
import Constants from "expo-constants";
import { Platform } from "react-native";

export const APP_VERSION = Constants.expoConfig?.version as string;

export const APP_SCHEME = Constants.expoConfig?.scheme as string;

export const BUILD_VERSION = nativeApplicationVersion;

export const BUILD_ID = nativeBuildVersion;

export const CRYPTO_KEY = process.env.EXPO_PUBLIC_CRYPTO_KEY as string;

export const GOOGLE_PLAY_DOWNLOAD_URL = process.env
	.EXPO_PUBLIC_GOOGLE_PLAY_URL as string;

export const APP_STORE_DOWNLOAD_URL = process.env
	.EXPO_PUBLIC_APP_STORE_URL as string;

export const APP_DOWNLOAD_URL =
	Platform.OS === "android" ? GOOGLE_PLAY_DOWNLOAD_URL : APP_STORE_DOWNLOAD_URL;

export const DEVELOPMENT_MODE = process.env.MODE === "development";
