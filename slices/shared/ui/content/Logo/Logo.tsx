import { memo } from "react";
import type { ImageProps, ViewProps } from "react-native";
import * as C from "./Logo.components";
import { useLoaderStyle } from "./useLoaderStyle";

export type LogoProps = ImageProps & {
	size?: number;
	contentContainerStyle?: ViewProps["style"];
};

export const Logo = ({
	size = 200,
	contentContainerStyle,
	...props
}: LogoProps) => {
	const style = useLoaderStyle(size);
	const containerStyle = {
		height: size,
	};
	return (
		<C.Container style={[contentContainerStyle, containerStyle]}>
			<C.Image {...props} style={[props.style, style]} />
		</C.Container>
	);
};

export const LogoMemo = memo(Logo);
