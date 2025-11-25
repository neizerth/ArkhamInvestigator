import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import { selectCurrentChaosTokenOption } from "./options/selectCurrentChaosTokenOption";
import { selectBoardTokenTypes } from "./selectBoardTokenTypes";

type Options = PropsWithBoardId & {
	type: ChaosTokenType;
};
export const selectIsChaosTokenPersonal = (options: Options) =>
	createSelector(
		[
			selectCurrentChaosTokenOption(options),
			selectBoardTokenTypes(options.boardId),
		],
		(option, types) => {
			const { type } = options;
			if (!option || type === "custom") {
				return false;
			}

			if (types.includes(type)) {
				return true;
			}

			if (option.personal) {
				return true;
			}

			return false;
		},
	);
