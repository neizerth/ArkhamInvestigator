import type { SelectBoardValueByTypeOptions } from "../lib";
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
