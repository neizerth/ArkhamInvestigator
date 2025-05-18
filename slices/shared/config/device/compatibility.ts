import { Platform } from "react-native";

const isAndroid7 =
	Platform.OS === "android" && [24, 25].includes(Platform.Version);

export const REMOVE_CLIPPED_SUBVIEWS = !isAndroid7;
