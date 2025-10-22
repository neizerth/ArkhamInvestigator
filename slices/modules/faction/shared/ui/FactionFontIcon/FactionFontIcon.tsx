import type { PropsWithFaction } from "@shared/model";
import { Icon, type IconProps } from "@shared/ui";
import { useMemo } from "react";
import { getFactionColor } from "../../lib";

export type FactionFontIconProps = Omit<IconProps, "icon"> &
	PropsWithFaction & {
		colored?: boolean;
		light?: boolean;
		simple?: boolean;
	};
export const FactionFontIcon = ({
	faction,
	colored,
	light = false,
	simple = false,
	...props
}: FactionFontIconProps) => {
	const icon = faction === "mystic" && !simple ? "mystic_alt" : faction;

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
