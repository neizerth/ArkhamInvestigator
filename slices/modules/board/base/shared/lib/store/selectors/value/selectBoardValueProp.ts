import type {
	BoardId,
	InvestigatorBoardValues,
} from "@modules/board/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import { selectBoardProp } from "../props/selectBoardProp";

type Key = keyof InvestigatorBoardValues;

export type SelectBoardValueByTypeOptions<K extends Key> = {
	boardId: BoardId;
	type: "value" | "baseValue" | "initialValue";
	prop: K;
	defaultValue?: InvestigatorBoardValues[K];
};

export const selectBoardValueProp = <K extends Key>({
	type,
	boardId,
	prop,
	defaultValue = 0,
}: SelectBoardValueByTypeOptions<K>) =>
	createSelector(
		[
			selectBoardProp({
				prop: type,
				boardId,
			}),
		],
		(values) => {
			return values?.[prop] || defaultValue;
		},
	);
