import { pick } from "ramda";
import { StyleSheet, type ViewProps } from "react-native";
import type { FastImageProps } from "react-native-fast-image";
import * as C from "./ImageBackground.components";

export type ImageBackgroundProps = Omit<FastImageProps, "style"> & {
	style?: ViewProps["style"];
	imageStyle?: FastImageProps["style"];
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
