import type { Box } from "@shared/model";
import * as C from "../../config";
import type { HeaderLayout, HeaderLayoutType } from "../../model";

const headerRowWidth =
	C.titleStyle.width + C.skillsStyle.width - C.headerGap.horizontal;

export const getHeaderLayoutType = ({ width }: Box): HeaderLayoutType => {
	// const orientation = width > height ? 'landscape' : 'portrait';
	return width > C.MAX_COLUMN_WIDTH ? "row" : "column";
};

export const resizeHeaderLayout =
	(window: Box) =>
	(layout: HeaderLayout): HeaderLayout => {
		const maxHeight = (window.height * C.MAX_IMAGE_HEIGHT) / 100;

		if (layout.type === "column" || layout.height <= maxHeight) {
			return layout;
		}

		const height = maxHeight;
		const scale = maxHeight / C.HEADER_HEIGHT;
		const width = Math.round(layout.width * scale);
		const gap = C.headerGap.horizontal * scale;

		return {
			type: layout.type,
			width,
			height,
			scale,
			gap,
		};
	};

export const getHeaderLayout = (window: Box): HeaderLayout => {
	const type = getHeaderLayoutType(window);
	const resize = resizeHeaderLayout(window);

	if (type === "column") {
		const { width } = window;
		// const
		const scale = width / C.skillsStyle.width;
		const height = C.HEADER_HEIGHT * 2 * scale;

		const gap = C.headerGap.horizontal * scale;

		return resize({
			type: "column",
			width,
			height,
			scale,
			gap,
		});
	}

	const width = Math.min(window.width, headerRowWidth);

	const scale = width / headerRowWidth;
	const height = C.HEADER_HEIGHT * scale;
	const gap = C.headerGap.horizontal * scale;

	return resize({
		type: "row",
		width,
		height,
		scale,
		gap,
	});
};
