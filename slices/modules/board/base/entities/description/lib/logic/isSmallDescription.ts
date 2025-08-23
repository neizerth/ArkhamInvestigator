import { EASTERN_LANGUAGES } from "@modules/core/i18n/shared/config";
import { CAN_ALWAYS_SHOW_GAME_TEXT } from "@shared/config";

type Options = {
	alwaysShowText: boolean;
	text: string;
	boardsCount: number;
	language: string;
};

export const isSmallDescription = ({
	alwaysShowText,
	text,
	boardsCount,
	language,
}: Options) => {
	const show = alwaysShowText && CAN_ALWAYS_SHOW_GAME_TEXT;
	const isLargeText = text.length > 350;

	return (
		show &&
		boardsCount > 1 &&
		(isLargeText || EASTERN_LANGUAGES.includes(language))
	);
};
