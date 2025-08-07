import type { ViewProps } from "react-native";
import type { IconProps } from "../Icon";
import * as C from "./LayeredIcon.components";

export type IconLayer = {
	icon: string;
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
	return (
		<C.Container style={contentContainerStyle}>
			{layers.map(({ fontSize, color, ...layer }, index) => (
				<C.Layer key={layer.icon} background={index === layers.length - 1}>
					<C.LayerIcon
						{...props}
						style={[
							props.style,
							color && { color },
							Boolean(fontSize) && { fontSize },
							layer.style,
						]}
						icon={layer.icon}
					/>
				</C.Layer>
			))}
		</C.Container>
	);
};
