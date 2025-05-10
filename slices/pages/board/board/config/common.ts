import type { RectPosition } from "@shared/model";
import type { HeaderLayoutType } from "../model";

export const MAX_COLUMN_WIDTH = 600;
export const STATUS_BAR_PADDING = 0;

export const servicePadding: Record<HeaderLayoutType, RectPosition> = {
	row: {
		top: 10,
		bottom: 0,
		right: 40,
		left: 40,
	},
	column: {
		top: 40,
		bottom: 0,
		right: 0,
		left: 0,
	},
};

export const PORTRAIT_DESCRIPTION_HEIGHT = 70;

export const PORTRAIT_DESCRIPTION_OFFSET = 40;

export const SIDEBAR_BOTTOM = 200;
