import { pick } from "ramda";
import type { PropsWithChildren } from "react";
import { type ImageProps, StyleSheet, type ViewProps } from "react-native";
import { useBoolean } from "../../../lib";
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
	const [loading, setLoading] = useBoolean(true);

	const pickSize = pick(["width", "height"]);
	const defaultBackgroundStyle = pickSize(StyleSheet.flatten(style));
	const backgroundStyle = pickSize(props);

	const loadingStyle = loading && {
		opacity: 0,
	};

	return (
		<C.Container style={style}>
			<C.Background
				{...props}
				style={[
					defaultBackgroundStyle,
					backgroundStyle,
					imageStyle,
					loadingStyle,
				]}
				onLoadStart={setLoading.on}
				onLoadEnd={setLoading.off}
			/>
			{!loading && children}
		</C.Container>
	);
};
