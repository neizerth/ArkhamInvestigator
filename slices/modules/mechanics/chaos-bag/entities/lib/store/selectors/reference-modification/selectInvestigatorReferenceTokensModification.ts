import { createSelector } from "@reduxjs/toolkit";
import { InvesigatorCode } from "@shared/config";
import { selectBoardById } from "@shared/lib";
import type { BoardId } from "@shared/model";
import type { ReferencePart } from "arkham-investigator-data";
import { selectJimCulverReferenceModification } from "./modifications";

const JimCodes = [
	InvesigatorCode.JimCulver.base,
	InvesigatorCode.JimCulver.parallel,
];

export const selectInvestigatorReferenceTokensModification = (
	boardId: BoardId,
) =>
	createSelector(
		[selectBoardById(boardId), selectJimCulverReferenceModification],
		(board, jimCulverModification): ReferencePart[] => {
			const { code } = board.investigator;

			if (JimCodes.includes(code)) {
				return jimCulverModification;
			}
			return [];
		},
	);
