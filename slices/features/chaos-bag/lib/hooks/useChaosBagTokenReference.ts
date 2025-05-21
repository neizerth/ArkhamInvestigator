import {
	selectBoardProp,
	selectReferenceCardText,
	useAppSelector,
} from "@shared/lib";
import type { BoardId } from "@shared/model";
import { useMemo } from "react";
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

		return getChaosBagTokenRefence([signature.text, referenceText]);
	}, [signature, referenceText]);
};
