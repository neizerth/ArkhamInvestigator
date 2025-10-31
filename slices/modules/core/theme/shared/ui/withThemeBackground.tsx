import { useAppSelector } from "@shared/lib";
import { ImageBackground, type ImageBackgroundProps } from "@shared/ui";
import type { FC } from "react";
import type { ViewStyle } from "react-native";
import { selectArtworksEnabled } from "../lib";

export type WithThemeBackgroundProps = ImageBackgroundProps & {
	fallbackSource?: ImageBackgroundProps["source"];
};

const imageStyle: ViewStyle = {
	justifyContent: "center",
	alignItems: "center",
};

export const withThemeBackground = ({
	fallbackSource,
	...imageProps
}: WithThemeBackgroundProps = {}) => {
	const Component: FC<ImageBackgroundProps> = ({ ...props }) => {
		const artworksEnabled = useAppSelector(selectArtworksEnabled);
		const source =
			artworksEnabled || !fallbackSource ? imageProps.source : fallbackSource;

		return (
			<ImageBackground
				{...imageProps}
				{...props}
				style={[imageStyle, imageProps.style, props.style]}
				source={source}
			/>
		);
	};

	const displayName = Component.displayName || Component.name;
	Component.displayName = `WithThemeBackground(${displayName})`;

	return Component;
};
