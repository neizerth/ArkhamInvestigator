import type { ImageProps } from "expo-image";
import type { ViewProps } from "react-native";

export type AnimatedGrayscaleImageProps = ImageProps & {
	contentContainerStyle?: ViewProps["style"];
	grayscaleSource?: ImageProps["source"];
	grayscale?: boolean;
};
