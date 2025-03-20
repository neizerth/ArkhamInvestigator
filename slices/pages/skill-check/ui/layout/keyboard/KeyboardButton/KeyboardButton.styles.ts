import type { Box, PropsWithBox } from "@shared/model";
import type { KeyboardButtonSize, PropsWithSize } from "./KeyboardButton.types";

type SizeRecord = Record<KeyboardButtonSize, number>;

const buttonSize: SizeRecord = {
	small: 38,
	medium: 65,
	large: 100,
};

const textSize: SizeRecord = {
	small: 40,
	medium: 48,
	large: 80,
};

const MIN_HEIGHT = 600;
type StyleOptions = PropsWithBox & PropsWithSize;

const getScale = (height: number) => height / MIN_HEIGHT;
export const withSize =
	(sizes: SizeRecord) =>
	({ box, size = "medium" }: StyleOptions) => {
		const defaultSize = sizes[size];
		if (box.height > 500) {
			return defaultSize;
		}
		const scale = getScale(box.height);

		return defaultSize * scale;
	};

export const getButtonSize = withSize(buttonSize);
export const getTextSize = withSize(textSize);

export const getButtonStyle = (options: StyleOptions) => {
	const size = getButtonSize(options);
	return {
		// width: size,
		height: size,
	};
};

export const getTextStyle = (options: StyleOptions) => {
	const size = getTextSize(options);
	return {
		fontSize: size,
	};
};
