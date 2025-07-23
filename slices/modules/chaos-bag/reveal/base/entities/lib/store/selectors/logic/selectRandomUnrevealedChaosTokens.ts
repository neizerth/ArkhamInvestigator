import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import { selectChaosBagContents } from "@modules/chaos-bag/base/shared/lib";
import { selectRevealedTokenIds } from "@modules/chaos-bag/reveal/base/shared/lib";
import { selectChaosBagTokenValues } from "@modules/chaos-bag/value/entities/lib";
import { createSelector } from "@reduxjs/toolkit";
import { getRandomChaosTokens } from "../../../logic";

type Options = PropsWithBoardId & {
	count: number;
};

export const selectRandomUnrevealedChaosTokens = ({
	boardId,
	count,
}: Options) =>
	createSelector(
		[
			selectRevealedTokenIds,
			selectChaosBagContents,
			selectChaosBagTokenValues(boardId),
		],
		(revealedIds, contents, values) => {
			return getRandomChaosTokens({
				revealedIds,
				contents,
				count,
				values,
			});
		},
	);
