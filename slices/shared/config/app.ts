import { nativeApplicationVersion, nativeBuildVersion } from "expo-application";
import pkg from "../../../package.json";

export const APP_VERSION = pkg.version;

export const BUILD_VERSION = nativeApplicationVersion;

export const BUILD_ID = nativeBuildVersion;
