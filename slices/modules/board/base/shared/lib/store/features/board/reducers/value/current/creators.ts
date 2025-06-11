import type {
	BoardDraft,
	InvestigatorBoardValues,
} from "@modules/board/base/shared/model";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { InvestigatorBoardStat } from "@shared/model";
import { always } from "ramda";
import {
	type HandleReduceBoardValuePropOptions,
	type HandleReduceBoardValuePropType,
	handleSetBoardValueProp,
} from "../../../handlers";

type ReduceOptions<K extends InvestigatorBoardStat> = Omit<
	HandleReduceBoardValuePropOptions<K>,
	"type" | "state" | "boardId"
>;

type SetOptions<K extends InvestigatorBoardStat> = Omit<
	ReduceOptions<K>,
	"reducer"
> & {
	value: InvestigatorBoardValues[K];
};

export const createCurrentValuePropSetter =
	(type: HandleReduceBoardValuePropType) =>
	<K extends InvestigatorBoardStat>(
		state: BoardDraft,
		{ payload }: PayloadAction<SetOptions<K>>,
	) => {
		handleSetBoardValueProp({
			...payload,
			boardId: "current",
			state,
			type,
			reducer: always(payload.value),
		});
	};

export const createCurrentValuePropReducer =
	(type: HandleReduceBoardValuePropType) =>
	<K extends InvestigatorBoardStat>(
		state: BoardDraft,
		{ payload }: PayloadAction<ReduceOptions<K>>,
	) => {
		handleSetBoardValueProp({
			...payload,
			boardId: "current",
			state,
			type,
		});
	};
