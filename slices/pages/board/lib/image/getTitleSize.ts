import { HEADER_HEIGHT, titleStyle } from "@pages/board/config";
import type { HeaderLayout } from "@pages/board/model";

const titleRatio = titleStyle.width / HEADER_HEIGHT;

export const getTitleSize = (layout: HeaderLayout) => {
	if (layout.type === "column") {
		const scale = layout.width / titleStyle.width;
		const { width } = layout;
		const height = width / titleRatio;

		return {
			width,
			height,
			scale,
		};
	}
	const { scale } = layout;
	const width = titleStyle.width * scale;
	const height = HEADER_HEIGHT * scale;

	return {
		width,
		height,
		scale,
	};
};
