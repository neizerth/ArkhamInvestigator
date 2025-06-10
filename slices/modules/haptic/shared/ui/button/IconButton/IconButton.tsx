import { Icon, type IconProps } from "@shared/ui/game";
import type { TouchableOpacityProps } from "../../TouchableOpacity";
import * as C from "./IconButton.components";

export type IconButtonProps = TouchableOpacityProps & {
	icon: string;
	scaleType?: IconProps["scaleType"];
	iconStyle?: IconProps["style"];
};

export type DefinedIconButtonProps = Omit<IconButtonProps, "icon">;

export const IconButton = ({
	icon,
	scaleType,
	iconStyle,
	children,
	...props
}: IconButtonProps) => {
	return (
		<C.Container {...props}>
			<Icon icon={icon} scaleType={scaleType} style={iconStyle} />
			{children}
		</C.Container>
	);
};
