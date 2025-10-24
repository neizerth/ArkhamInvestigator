import { selectArtworksEnabled } from "@modules/core/theme/shared/lib";
import type { FC } from "react";
import { View, type ViewStyle } from "react-native";
import { useAppSelector } from "../../lib/hooks/store/useAppSelector";
import {
	ImageBackground,
	type ImageBackgroundProps,
} from "../../ui/image/ImageBackground";

export type WithBackgroundComponentProps = ImageBackgroundProps;

const imageStyle: ViewStyle = {
	justifyContent: "center",
	alignItems: "center",
};
export const withImageBackground = (imageProps: ImageBackgroundProps = {}) => {
	const Component: FC<ImageBackgroundProps> = ({ ...props }) => {
		const artworksEnabled = useAppSelector(selectArtworksEnabled);

		if (!artworksEnabled) {
			return (
				<View style={[imageStyle, imageProps.style, props.style]}>
					{props.children}
				</View>
			);
		}
		return (
			<ImageBackground
				{...imageProps}
				{...props}
				style={[imageStyle, imageProps.style, props.style]}
			/>
		);
	};

	const displayName = Component.displayName || Component.name;
	Component.displayName = `WithImageBackground(${displayName})`;

	return Component;
};
