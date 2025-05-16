import type { RectPosition } from "@shared/model";
import { Dimensions } from "react-native";
import type { HeaderLayoutType } from "../model";

const screen = Dimensions.get("screen");

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

export const DEFAULT_PORTRAIT_DESCRIPTION_HEIGHT =
	screen.height > 640 ? 70 : 80;

export const PORTRAIT_DESCRIPTION_OFFSET = 40;

export const PINNED_CHECKS_MIN_HEIGHT = 60;
