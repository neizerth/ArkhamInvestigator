import { isNumber } from "mathjs";
import { StyleSheet, type ViewProps } from "react-native";
import type { IconProps } from "../Icon";
import * as C from "./LayeredIcon.components";

export type IconLayer = {
	icon: string;
	lineHeight?: number;
	fontSize?: number;
	color?: string;
	style?: IconProps["style"];
};

export type LayeredIconProps = Omit<IconProps, "icon"> & {
	contentContainerStyle?: ViewProps["style"];
	layers: IconLayer[];
	size?: number;
};

export const LayeredIcon = ({
	contentContainerStyle,
	layers,
	...props
}: LayeredIconProps) => {
	const { fontSize } = StyleSheet.flatten(props.style);

	return (
		<C.Container
			style={[
				isNumber(fontSize) && {
					width: fontSize * 1.2,
					height: fontSize * 1.2,
				},
				contentContainerStyle,
			]}
		>
			{layers.map(({ fontSize, color, lineHeight, ...layer }) => (
				<C.Layer key={layer.icon}>
					<C.LayerIcon
						{...props}
						style={[
							props.style,
							color && { color },
							Boolean(fontSize) && { fontSize },
							Boolean(lineHeight) && { lineHeight },
							layer.style,
						]}
						icon={layer.icon}
					/>
				</C.Layer>
			))}
		</C.Container>
	);
};
