import { Platform } from "react-native";

const IS_ANDROID_7 =
	Platform.OS === "android" && [24, 25].includes(Platform.Version);

export const REMOVE_CLIPPED_SUBVIEWS = !IS_ANDROID_7;
