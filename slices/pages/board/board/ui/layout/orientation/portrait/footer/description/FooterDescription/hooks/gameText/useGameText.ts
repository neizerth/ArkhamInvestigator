import {
	selectAlwaysShowGameText,
	selectBoardsCount,
	selectCurrentBoardProp,
} from "@modules/board/base/shared/lib";
import { selectCurrentLanguage } from "@modules/core/i18n/shared/lib";
import { CAN_ALWAYS_SHOW_GAME_TEXT } from "@shared/config";
import { selectShowDescription, useAppSelector } from "@shared/lib";
import { useGameTextLayout } from "./useGameTextLayout";

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
		!showDescription &&
		boardsCount > 1 &&
		(isLargeText || ["ko", "zh", "zh-cn"].includes(language));
	const onLayout = useGameTextLayout();

	return {
		show,
		showSmallText,
		onLayout,
	};
};
