import { selectBoardById, useAppSelector } from "@shared/lib";
import type { BoardId } from "@shared/model";
import { useMemo } from "react";
import type { ChaosTokenType } from "../../../model";
import { selectChaosBagTokenReference } from "../../store";

type Options = {
	boardId?: BoardId;
};

export const useChaosBagSpecialTokenReference = ({
	boardId = "current",
}: Options = {}) => {
	const board = useAppSelector(selectBoardById(boardId));
	const referenceEffects = useAppSelector(
		selectChaosBagTokenReference(boardId),
	);
	const signatureEffects = board.investigator.tokens_reference;

	return useMemo(() => {
		const reference = [...referenceEffects, ...signatureEffects];

		return reference.reduce(
			(acc, entry) => {
				if (entry.type === "single") {
					acc[entry.token] = entry.effect;
					return acc;
				}
				for (const token of entry.tokens) {
					acc[token] = entry.effect;
				}
				return acc;
			},
			{} as Partial<Record<ChaosTokenType, string>>,
		);
	}, [referenceEffects, signatureEffects]);
};
