import type { ImageRequireSource } from "react-native";
import { preloadImageSource } from "./preloadImageSource";

export const preloadImages = async (sources: ImageRequireSource[]) => {
	for (const source of sources) {
		await preloadImageSource(source);
	}
};
