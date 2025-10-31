import type { PropsWithFaction } from "@shared/model";
import { Icon, type IconProps } from "@shared/ui";
import { useMemo } from "react";
import {
	type GetFactionColorProps,
	type GetFactionIconProps,
	getFactionColor,
	getFactionIcon,
} from "../../../lib";

export type FactionFontIconProps = Omit<IconProps, "icon"> &
	PropsWithFaction &
	GetFactionColorProps &
	GetFactionIconProps;

export const FactionFontIcon = ({
	colored,
	light = false,
	...props
}: FactionFontIconProps) => {
	const { faction } = props;

	const icon = getFactionIcon(props);

	const color = getFactionColor({ faction, colored, light });

	const style = useMemo(() => {
		if (!color) {
			return;
		}
		return {
			color,
		};
	}, [color]);

	return <Icon {...props} icon={icon} style={[style, props.style]} />;
};
