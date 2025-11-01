import { ImageBackground, type ImageBackgroundProps } from "@shared/ui";
import type { ViewStyle } from "react-native";
import { withThemeSource } from "./withThemeSource";

export type WithThemeBackgroundProps = ImageBackgroundProps & {
	fallbackSource?: ImageBackgroundProps["source"];
};

const imageStyle: ViewStyle = {
	justifyContent: "center",
	alignItems: "center",
};

export const withThemeBackground = withThemeSource(ImageBackground, {
	style: imageStyle,
});
