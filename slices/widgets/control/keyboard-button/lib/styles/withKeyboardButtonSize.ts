import type { PropsWithBox } from "@shared/model";
import type {
	KeyboardButtonSizeRecord,
	PropsWithKeyboardSize,
} from "../../model";

export type KeyboardButtonStyleOptions = PropsWithBox & PropsWithKeyboardSize;

const MIN_HEIGHT = 600;

export const withKeyboardButtonsSize =
	(sizes: KeyboardButtonSizeRecord) =>
	({ box, size = "medium" }: KeyboardButtonStyleOptions) => {
		const defaultSize = sizes[size];
		if (box.height > 500) {
			return defaultSize;
		}
		const scale = box.height / MIN_HEIGHT;

		return defaultSize * scale;
	};
