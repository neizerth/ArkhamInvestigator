import {
	selectBoardProp,
	selectReferenceCardText,
	useAppSelector,
} from "@shared/lib";
import type { BoardId } from "@shared/model";
import { useMemo } from "react";
import type { ChaosTokenType } from "../../../model";
import { getChaosBagTokenReference } from "../../reference";

type Options = {
	boardId?: BoardId;
};

export const useChaosBagSpecialTokenReference = ({
	boardId = "current",
}: Options = {}) => {
	const signature = useAppSelector(selectBoardProp(boardId, "investigator"));
	const referenceText = useAppSelector(selectReferenceCardText) || "";
	const signatureText = signature?.text || "";

	return useMemo(() => {
		const reference = getChaosBagTokenReference([signatureText, referenceText]);

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
	}, [signatureText, referenceText]);
};
