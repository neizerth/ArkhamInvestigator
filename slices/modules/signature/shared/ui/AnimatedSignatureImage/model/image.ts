import type { ViewProps } from "react-native";
import type { SignatureImageProps } from "../../SignatureImage";

export type AnimatedSignatureImageProps = SignatureImageProps & {
	contentContainerStyle: ViewProps["style"];
};
