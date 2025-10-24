import { selectArtworksEnabled } from "@modules/core/theme/shared/lib";
import { useAppSelector } from "@shared/lib";
import type { PropsWithFaction } from "@shared/model";
import { Icon, type IconProps } from "@shared/ui";
import { useMemo } from "react";
import { getFactionColor, getFactionIcon } from "../../lib";
import type { FactionIconType } from "../../model";

export type FactionFontIconProps = Omit<IconProps, "icon"> &
	PropsWithFaction & {
		colored?: boolean;
		light?: boolean;
	};
export const FactionFontIcon = ({
	colored,
	light = false,
	...props
}: FactionFontIconProps) => {
	const { faction } = props;
	const artworksEnabled = useAppSelector(selectArtworksEnabled);

	const type: FactionIconType = artworksEnabled ? "default" : "alt";
	const icon = getFactionIcon({ ...props, type });

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
