import type { ImageProps, ViewProps } from "react-native";
import * as C from "./Loader.components";
import { useLoaderStyle } from "./useLoaderStyle";

export type LoaderProps = ImageProps & {
	size?: number;
	contentContainerStyle?: ViewProps["style"];
};

export const Loader = ({
	size = 200,
	contentContainerStyle,
	...props
}: LoaderProps) => {
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
