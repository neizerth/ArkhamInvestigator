import { factionColor } from "@shared/config";
import type { PropsWithFaction } from "@shared/model";
import { Icon, type IconProps } from "@shared/ui";
import { useMemo } from "react";

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

	const style = useMemo(() => {
		if (colored) {
			const palette = factionColor[faction];
			const color = light ? palette.lightColor : palette.darkColor;
			return {
				color,
			};
		}
		return;
	}, [colored, faction, light]);

	return <Icon {...props} icon={icon} style={[style, props.style]} />;
};
