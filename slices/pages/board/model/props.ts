import type { Box, InvestigatorBoard } from "@shared/model";
import type  { HeaderLayout } from "./layout";

export type PropsWithLayout = {
	layout: HeaderLayout;
};

export type PropsWithView = {
	view: Box;
};

export type PropsWithBoard = {
	board: InvestigatorBoard;
};
