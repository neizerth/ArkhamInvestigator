import { EASTERN_LANGUAGES } from "@modules/core/i18n/shared/config";
import { CAN_ALWAYS_SHOW_GAME_TEXT } from "@shared/config";

type Options = {
	descriptionShown: boolean;
	alwaysShowText: boolean;
	text: string;
	language: string;
};

const scales = [
	{
		size: 350,
		scale: 0.9,
	},
	{
		size: 520,
		scale: 0.8,
	},
];

export const getDescriptionScale = ({
	descriptionShown,
	alwaysShowText,
	text,
	language,
}: Options) => {
	const show = alwaysShowText && CAN_ALWAYS_SHOW_GAME_TEXT;
	const breaksCount = text.split("\n").length;
	const textSize = text.length;
	const manyBreaks = breaksCount > 4;

	const isSmall =
		(show && (textSize > 350 || EASTERN_LANGUAGES.includes(language))) ||
		manyBreaks;

	const smallK = isSmall && !descriptionShown ? 0.9 : 1;

	const sizeK = textSize > 520 ? (descriptionShown ? 0.8 : 0.9) : 1;

	return smallK * sizeK;
};
