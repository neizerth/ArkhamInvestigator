import { factionColor } from "@shared/config";
import type { PropsWithFaction } from "@shared/model";
import { Icon, type IconProps } from "@shared/ui";
import { useMemo } from "react";

export type FactionFontIconProps = Omit<IconProps, "icon"> &
	PropsWithFaction & {
		colored?: boolean;
	};
export const FactionFontIcon = ({
	faction,
	colored,
	...props
}: FactionFontIconProps) => {
	const icon = faction === "mystic" ? "mystic_alt" : faction;

	const style = useMemo(() => {
		if (colored) {
			return {
				color: factionColor[faction].darkColor,
			};
		}
		return;
	}, [colored, faction]);

	return <Icon {...props} icon={icon} style={[style, props.style]} />;
};
