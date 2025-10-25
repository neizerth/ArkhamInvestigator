import { selectArtworksEnabled } from "@modules/core/theme/shared/lib";
import type { FC } from "react";
import type { ViewStyle } from "react-native";
import { useAppSelector } from "../../lib/hooks/store/useAppSelector";
import {
	ImageBackground,
	type ImageBackgroundProps,
} from "../../ui/image/ImageBackground";

export type WithBackgroundComponentProps = ImageBackgroundProps & {
	fallbackSource?: ImageBackgroundProps["source"];
};

const imageStyle: ViewStyle = {
	justifyContent: "center",
	alignItems: "center",
};

export const withImageBackground = (
	imageProps: WithBackgroundComponentProps = {},
) => {
	const Component: FC<ImageBackgroundProps> = ({ ...props }) => {
		const artworksEnabled = useAppSelector(selectArtworksEnabled);
		const source = artworksEnabled
			? imageProps.source
			: imageProps.fallbackSource;

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
	Component.displayName = `WithImageBackground(${displayName})`;

	return Component;
};
