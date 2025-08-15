import { Asset } from "expo-asset";
import type { ImageRequireSource } from "react-native";

export const preloadAssetImageSource = (source: ImageRequireSource) =>
	Asset.fromModule(source).downloadAsync();
