import type { InvestigatorBoard } from "../../model";

export const isBoardExists = (board: InvestigatorBoard) => board.id !== 0;
