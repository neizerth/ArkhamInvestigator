import { isBoardExists, selectBoardById } from "@modules/board/base/shared/lib";
import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import { selectCurrentLanguage } from "@modules/core/i18n/shared/lib";
import { createSelector } from "@reduxjs/toolkit";
import {
	type DeclenseSignatureNameOptions,
	declenseSignatureName,
} from "../../../features";

type Options = Omit<DeclenseSignatureNameOptions, "signature" | "language"> &
	PropsWithBoardId;

export const selectDeclensedSignatureName = (options: Options) =>
	createSelector(
		[selectBoardById(options.boardId), selectCurrentLanguage],
		(board, language) => {
			if (!isBoardExists(board)) {
				return;
			}
			const signature = board.investigator;
			return declenseSignatureName({
				...options,
				signature,
				language,
			});
		},
	);
