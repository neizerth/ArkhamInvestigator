import type { ImageProps } from "expo-image";
import { pick } from "ramda";
import type { PropsWithChildren } from "react";
import { StyleSheet, type ViewProps } from "react-native";
import * as C from "./ImageBackground.components";

export type ImageBackgroundProps = Omit<ImageProps, "style"> &
	PropsWithChildren & {
		style?: ViewProps["style"];
		imageStyle?: ImageProps["style"];
		width?: number;
		height?: number;
	};
export const ImageBackground = ({
	children,
	style,
	imageStyle,
	...props
}: ImageBackgroundProps) => {
	const pickSize = pick(["width", "height"]);
	const defaultBackgroundStyle = pickSize(StyleSheet.flatten(style));
	const backgroundStyle = pickSize(props);
	return (
		<C.Container style={style}>
			<C.Background
				{...props}
				style={[defaultBackgroundStyle, backgroundStyle, imageStyle]}
			/>
			{children}
		</C.Container>
	);
};
