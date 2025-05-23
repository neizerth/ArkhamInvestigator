import {
	selectBoardProp,
	selectReferenceCardText,
	useAppSelector,
} from "@shared/lib";
import type { BoardId } from "@shared/model";
import { useMemo } from "react";
import type { ChaosTokenType } from "../../model";
import { getChaosBagTokenRefence } from "../reference";

type Options = {
	boardId?: BoardId;
};

export const useChaosBagTokenReference = ({
	boardId = "current",
}: Options = {}) => {
	const signature = useAppSelector(selectBoardProp(boardId, "investigator"));
	const referenceText = useAppSelector(selectReferenceCardText);

	return useMemo(() => {
		if (!signature || !referenceText) {
			return {};
		}

		const reference = getChaosBagTokenRefence([signature.text, referenceText]);

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
	}, [signature, referenceText]);
};
