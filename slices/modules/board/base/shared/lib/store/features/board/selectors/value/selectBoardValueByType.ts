import type {
	BoardId,
	InvestigatorBoardValues,
} from "@modules/board/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import { selectBoardProp } from "../props";

type Key = keyof InvestigatorBoardValues;

export type SelectBoardValueByTypeOptions<K extends Key> = {
	boardId?: BoardId;
	type: "value" | "baseValue" | "initialValue";
	prop: K;
	defaultValue?: InvestigatorBoardValues[K];
};

export const selectBoardValueByType = <K extends Key>({
	type,
	boardId,
	prop,
	defaultValue,
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
