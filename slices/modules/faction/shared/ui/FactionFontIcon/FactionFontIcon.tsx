import type { PropsWithFaction } from "@shared/model";
import { Icon, type IconProps } from "@shared/ui";

export type FactionFontIconProps = Omit<IconProps, "icon"> & PropsWithFaction;
export const FactionFontIcon = ({
	faction,
	...props
}: FactionFontIconProps) => {
	const icon = faction === "mystic" ? "mystic_alt" : faction;

	return <Icon {...props} icon={icon} />;
};
