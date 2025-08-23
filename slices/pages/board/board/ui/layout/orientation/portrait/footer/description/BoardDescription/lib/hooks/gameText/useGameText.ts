import {
	selectAlwaysShowGameText,
	selectBoardsCount,
	selectCurrentBoardProp,
	selectShowDescription,
} from "@modules/board/base/shared/lib";
import { EASTERN_LANGUAGES } from "@modules/core/i18n/shared/config";
import { selectCurrentLanguage } from "@modules/core/i18n/shared/lib";
import { CAN_ALWAYS_SHOW_GAME_TEXT } from "@shared/config";
import { useAppSelector } from "@shared/lib";

export const useGameText = () => {
	const alwaysShowText = useAppSelector(selectAlwaysShowGameText);
	const showDescription = useAppSelector(selectShowDescription);
	const boardsCount = useAppSelector(selectBoardsCount);
	const show = alwaysShowText && CAN_ALWAYS_SHOW_GAME_TEXT;
	const signature = useAppSelector(selectCurrentBoardProp("investigator"));
	const text = signature?.text || "";
	const language = useAppSelector(selectCurrentLanguage);
	const textSize = text.length;

	const isLargeText = textSize > 350;

	const showSmallText =
		show &&
		boardsCount > 1 &&
		!showDescription &&
		(isLargeText || EASTERN_LANGUAGES.includes(language));

	return {
		show,
		showSmallText,
	};
};
