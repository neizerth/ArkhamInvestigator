import type {
	BoardId,
	InvestigatorBoardValues,
} from "@modules/board/base/shared/model";
import type { RootState } from "@shared/model";
import { selectBoardProp } from "../props/selectBoardProp";

type Key = keyof InvestigatorBoardValues;

export type SelectBoardValueByTypeOptions<K extends Key> = {
	boardId: BoardId;
	type: "value" | "baseValue" | "initialValue";
	prop: K;
	defaultValue?: InvestigatorBoardValues[K];
};

export const selectBoardValueProp =
	<K extends Key>({
		type,
		boardId,
		prop,
		defaultValue = 0,
	}: SelectBoardValueByTypeOptions<K>) =>
	(state: RootState) => {
		const values = selectBoardProp({
			prop: type,
			boardId,
		})(state);

		return values?.[prop] || defaultValue;
	};
