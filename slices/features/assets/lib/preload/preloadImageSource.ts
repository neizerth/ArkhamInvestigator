import { Asset } from "expo-asset";
import type { ImageRequireSource } from "react-native";

export const preloadImageSource = (source: ImageRequireSource) => {
	return Asset.fromModule(source).downloadAsync();
};
