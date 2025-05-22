import type { ArkhamIcon, IconScaleType } from "@shared/model";

export const getIconScale = (
	icon: ArkhamIcon,
	scaleType: IconScaleType = "maxHeight",
) => {
	if (!icon.ratio) {
		return 1;
	}
	const { ratio } = icon;

	switch (scaleType) {
		case "maxHeight":
			return getMaxHeightRatio(ratio);
		case "fixedHeight":
			return ratio > 1 ? 1 / ratio : ratio;
		case "auto":
			return icon.ratio;
		case "circle":
			return icon.circled ? 1 : getMaxHeightRatio(ratio);
		default:
			return 1;
	}
};

export const getMaxHeightRatio = (ratio: number) => (ratio > 1 ? 1 / ratio : 1);
