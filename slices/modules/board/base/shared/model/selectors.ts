import type { SelectBoardValueByTypeOptions } from "../lib/store/features/board/selectors/value/selectBoardValueByType";
import type { InvestigatorBoardValues } from "./board";

type Key = keyof InvestigatorBoardValues;

export type SelectBoardValueOptions<K extends Key> = Omit<
	SelectBoardValueByTypeOptions<K>,
	"type"
>;

export type SelectCurrentValueOptions<K extends Key> = Omit<
	SelectBoardValueOptions<K>,
	"boardId"
>;
