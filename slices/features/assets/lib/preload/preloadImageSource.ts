import { Asset } from "expo-asset";
import type { ImageRequireSource } from "react-native";

export const preloadImageSource = async (source: ImageRequireSource) => {
	const response = await Asset.fromModule(source).downloadAsync();

	return response;
};
