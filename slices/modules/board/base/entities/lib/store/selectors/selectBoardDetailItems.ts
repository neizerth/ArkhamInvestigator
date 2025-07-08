import { selectInvestigatorBoards } from "@modules/board/base/shared/lib";
import { createSelector } from "@reduxjs/toolkit";
import type { InvestigatorDetailItem } from "@shared/model";

type BoardData = {
	id: number;
};

export const selectBoardDetailItems = createSelector(
	[selectInvestigatorBoards],
	(boards) =>
		boards.map((board): InvestigatorDetailItem<BoardData> => {
			const { investigator, signatureGroupId, image } = board;
			return {
				id: signatureGroupId,
				code: signatureGroupId,
				imageId: image.id,
				image,
				faction: investigator.faction_code,
				type: investigator.type,
				name: investigator.name,
				value: investigator.id,
				data: {
					id: board.id,
				},
			};
		}),
);
