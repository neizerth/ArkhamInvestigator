import { factionColor } from "@shared/config";
import type { PropsWithFaction } from "@shared/model";
import Color from "color";

type Options = PropsWithFaction & {
	colored?: boolean;
	light?: boolean;
	defaultColor?: string;
	alpha?: number;
};
export const getFactionColor = ({ alpha = 1, ...options }: Options) => {
	const color = getColor(options);
	if (!color) {
		return;
	}
	const alphaColor = Color(color).alpha(alpha).toString();
	return alphaColor;
};

export const getColor = ({
	faction,
	colored,
	light = false,
	defaultColor,
}: Options) => {
	if (!colored) {
		return defaultColor;
	}
	const palette = factionColor[faction];
	const paletteColor = light ? palette.lightColor : palette.darkColor;
	return paletteColor;
};
