import type { ImageProps, ViewProps } from "react-native";

export type AnimatedGrayscaleImageProps = ImageProps & {
	contentContainerStyle?: ViewProps["style"];
	grayscaleSource?: ImageProps["source"];
	grayscale?: boolean;
};
