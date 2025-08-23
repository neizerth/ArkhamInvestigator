import type { ViewProps } from "react-native";
import type { StaticSignatureImageProps } from "../../StaticSignatureImage";

export type AnimatedSignatureImageProps = StaticSignatureImageProps & {
	contentContainerStyle?: ViewProps["style"];
};
