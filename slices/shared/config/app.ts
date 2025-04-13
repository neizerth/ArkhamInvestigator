import { nativeApplicationVersion, nativeBuildVersion } from "expo-application";
import { Platform } from "react-native";
import pkg from "../../../package.json";

export const APP_VERSION = pkg.version;

export const BUILD_VERSION = nativeApplicationVersion;

export const BUILD_ID = nativeBuildVersion;

export const APP_DOWNLOAD_URL =
	Platform.OS === "android"
		? process.env.EXPO_PUBLIC_GOOGLE_PLAY_URL
		: process.env.EXPO_PUBLIC_APP_STORE_URL;
