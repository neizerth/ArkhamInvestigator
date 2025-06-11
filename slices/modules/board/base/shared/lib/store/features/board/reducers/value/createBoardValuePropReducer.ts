import type {
	BoardDraft,
	InvestigatorBoardStat,
	InvestigatorBoardValues,
} from "@modules/board/base/shared/model";
import type { PayloadAction } from "@reduxjs/toolkit";
import { always } from "ramda";
import {
	type HandleReduceBoardValuePropOptions,
	type HandleReduceBoardValuePropType,
	handleSetBoardValueProp,
} from "../../handlers";

type ReduceOptions<K extends InvestigatorBoardStat> = Omit<
	HandleReduceBoardValuePropOptions<K>,
	"type" | "state"
>;

type SetOptions<K extends InvestigatorBoardStat> = Omit<
	ReduceOptions<K>,
	"reducer"
> & {
	value: InvestigatorBoardValues[K];
};

export const createBoardValuePropSetter =
	(type: HandleReduceBoardValuePropType) =>
	<K extends InvestigatorBoardStat>(
		state: BoardDraft,
		{ payload }: PayloadAction<SetOptions<K>>,
	) => {
		handleSetBoardValueProp({
			...payload,
			state,
			type,
			reducer: always(payload.value),
		});
	};

export const createBoardValuePropReducer =
	(type: HandleReduceBoardValuePropType) =>
	<K extends InvestigatorBoardStat>(
		state: BoardDraft,
		{ payload }: PayloadAction<ReduceOptions<K>>,
	) => {
		handleSetBoardValueProp({
			...payload,
			state,
			type,
		});
	};
