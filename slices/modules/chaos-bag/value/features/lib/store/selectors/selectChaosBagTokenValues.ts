import type { BoardId } from "@modules/board/base/shared/model";

import {
	selectBoardRefenceCardTokenValues,
	selectCurrentReferenceCardTokenValues,
} from "@modules/chaos-bag/value/entities/lib";
import { defaultChaosTokenValues } from "@modules/chaos-bag/value/shared/config";
import { selectChaosTokenValueInternal } from "@modules/chaos-bag/value/shared/lib";
import {
	selectBoardChaosTokenValueModifications,
	selectBoardElderSignValue,
} from "@modules/mechanics/chaos-bag/value/entities/lib";
import type { RootState } from "@shared/model";
import { selectBoardTokenValues } from "./selectBoardTokenValues";

export const selectChaosBagTokenValues =
	(boardId: BoardId) => (state: RootState) => {
		const defaultValues = selectCurrentReferenceCardTokenValues(state);
		const defaultInvestigatorValues =
			selectBoardRefenceCardTokenValues(boardId)(state);
		const elderSign = selectBoardElderSignValue(boardId)(state);
		const values = selectChaosTokenValueInternal(state);
		const investigatorValues = selectBoardTokenValues(boardId)(state);
		const specialValues =
			selectBoardChaosTokenValueModifications(boardId)(state);

		return {
			...defaultChaosTokenValues,
			...defaultValues,
			...defaultInvestigatorValues,
			...(elderSign ? { elderSign } : {}),
			...(values || {}),
			...(investigatorValues || {}),
			...specialValues,
		};
	};
