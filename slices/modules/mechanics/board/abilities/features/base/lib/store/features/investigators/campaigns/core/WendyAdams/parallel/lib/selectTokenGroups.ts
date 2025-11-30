import type { BoardId } from "@modules/board/base/shared/model";
import { selectChaosBagContents } from "@modules/chaos-bag/base/shared/lib";
import { selectRevealHistoryByBoardId } from "@modules/chaos-bag/reveal/history/shared/lib";
import { createSelector } from "@reduxjs/toolkit";
import { last, prop } from "ramda";
import { createCountGroup } from "./createCounterGroup";

export const selectTokenGroups = (boardId: BoardId) =>
	createSelector(
		[selectChaosBagContents, selectRevealHistoryByBoardId(boardId)],
		(chaosBagTokens, historyItems) => {
			const lastHistoryItem = last(historyItems);

			const chaosBagIds = chaosBagTokens.map(prop("id"));

			const historyTokens =
				lastHistoryItem?.tokens.filter((token) => {
					if (chaosBagIds.includes(token.id)) {
						return false;
					}

					return !token.sealed;
				}) ?? [];

			const tokens = chaosBagTokens.filter((token) => !token.sealed);

			return {
				chaosBag: createCountGroup(tokens),
				history: createCountGroup(historyTokens),
			};
		},
	);
