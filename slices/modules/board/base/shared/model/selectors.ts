import type { SelectBoardPropValueOptions } from "../lib";
import type { InvestigatorBoardValues } from "./board";
import type { OmitBoard } from "./store";

type Key = keyof InvestigatorBoardValues;

export type SelectBoardValueOptions = Omit<SelectBoardPropValueOptions, "type">;

export type SelectCurrentValueOptions = OmitBoard<SelectBoardValueOptions>;
