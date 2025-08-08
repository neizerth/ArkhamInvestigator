import { nativeApplicationVersion, nativeBuildVersion } from "expo-application";
import { Platform } from "react-native";
import pkg from "../../../package.json";

export const APP_VERSION = pkg.version;

export const BUILD_VERSION = nativeApplicationVersion;

export const BUILD_ID = nativeBuildVersion;

export const GOOGLE_PLAY_DOWNLOAD_URL = process.env
	.EXPO_PUBLIC_GOOGLE_PLAY_URL as string;

export const APP_STORE_DOWNLOAD_URL = process.env
	.EXPO_PUBLIC_APP_STORE_URL as string;

export const APP_DOWNLOAD_URL =
	Platform.OS === "android" ? GOOGLE_PLAY_DOWNLOAD_URL : APP_STORE_DOWNLOAD_URL;

export const DEVELOPMENT_MODE = process.env.MODE === "development";
