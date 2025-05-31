import type { ImageProps } from "expo-image";
import { pick } from "ramda";
import type { PropsWithChildren } from "react";
import { StyleSheet, type ViewProps } from "react-native";
import { useBoolean } from "../../../lib/hooks/common/useBoolean";
import * as C from "./ImageBackground.components";

export type ImageBackgroundProps = Omit<ImageProps, "style"> &
	PropsWithChildren & {
		style?: ViewProps["style"];
		imageStyle?: ImageProps["style"];
		width?: number;
		height?: number;
		visible?: boolean;
	};
export const ImageBackground = ({
	children,
	style,
	imageStyle,
	visible = true,
	...props
}: ImageBackgroundProps) => {
	const pickSize = pick(["width", "height"]);
	const [loading, setLoading] = useBoolean(true);
	const defaultBackgroundStyle = pickSize(StyleSheet.flatten(style));
	const backgroundStyle = pickSize(props);

	const show = !loading || visible;

	return (
		<C.Container style={[style]}>
			<C.Background
				{...props}
				style={[defaultBackgroundStyle, backgroundStyle, imageStyle]}
				onLoadEnd={setLoading.off}
			/>
			{show && children}
		</C.Container>
	);
};
