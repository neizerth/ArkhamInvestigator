import { titleStyle } from "@widgets/game/investigator";
import type { HeaderLayout } from "../../model";

export const getTitleSize = (layout: HeaderLayout) => {
	if (layout.type === "column") {
		const scale = layout.width / titleStyle.width;
		const { width } = layout;
		const height = width / titleStyle.ratio;

		return {
			width,
			height,
			scale,
		};
	}
	const { scale } = layout;
	const width = titleStyle.width * scale;
	const height = titleStyle.height * scale;

	return {
		width,
		height,
		scale,
	};
};
