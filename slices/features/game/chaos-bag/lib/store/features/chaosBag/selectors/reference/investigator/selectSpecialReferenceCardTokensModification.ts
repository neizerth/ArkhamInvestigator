import { createSelector } from "@reduxjs/toolkit";
import { InvesigatorCode } from "@shared/config";
import { selectBoardById, selectReferenceCardTokenEffects } from "@shared/lib";
import type { BoardId } from "@shared/model";
import type { ReferencePart } from "arkham-investigator-data";
import { getReferencePartTokens } from "../../../../../../reference";

const JimCodes = [
	InvesigatorCode.JimCulver.base,
	InvesigatorCode.JimCulver.parallel,
];

export const selectSpecialReferenceCardTokensModification = (
	boardId: BoardId,
) =>
	createSelector(
		[selectBoardById(boardId), selectReferenceCardTokenEffects],
		(board, reference): ReferencePart[] => {
			const { code } = board.investigator;
			if (JimCodes.includes(code)) {
				const item = reference.find((item) =>
					getReferencePartTokens(item).includes("skull"),
				);

				if (!item) {
					return [];
				}

				return [
					{
						id: "elderSign",
						type: "single",
						token: "elderSign",
						effect: `<i>[skull]: ${item.effect}</i>`,
					},
				];
			}
			return [];
		},
	);
