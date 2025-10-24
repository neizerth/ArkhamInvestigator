import type { FactionIconType, PropsWithFaction } from "../model";

export type GetFactionIconProps = PropsWithFaction & {
	mysticVariant?: "default" | "simple";
	type?: FactionIconType;
};

export const getFactionIcon = (options: GetFactionIconProps) => {
	const { type = "default" } = options;
	if (type === "default") {
		return getDefaultFactionIcon(options);
	}
	return getAltFactionIcon(options);
};

export const getAltFactionIcon = ({ faction }: GetFactionIconProps) => {
	return `class_${faction}`;
};

export const getDefaultFactionIcon = ({
	faction,
	mysticVariant = "default",
}: GetFactionIconProps) => {
	return faction === "mystic" && mysticVariant === "default"
		? "mystic_alt"
		: faction;
};
