import { isBoardExists, selectBoardById } from "@modules/board/base/shared/lib";
import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import { selectCurrentLanguage } from "@modules/core/i18n/shared/lib";
import type { RootState } from "@shared/model";
import {
	type DeclenseSignatureNameOptions,
	declenseSignatureName,
} from "../../../features";

type Options = Omit<DeclenseSignatureNameOptions, "signature" | "language"> &
	PropsWithBoardId;

export const selectDeclensedSignatureName =
	(options: Options) => (state: RootState) => {
		const { boardId } = options;
		const board = selectBoardById(boardId)(state);
		const language = selectCurrentLanguage(state);
		if (!isBoardExists(board)) {
			return;
		}
		const signature = board.investigator;
		return declenseSignatureName({
			...options,
			signature,
			language,
		});
	};
