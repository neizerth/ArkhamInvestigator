import type {
	PropsWithBoard,
	PropsWithBoardId,
} from "@modules/board/base/shared/model";
import { createAction } from "@reduxjs/toolkit";
import type { MergeInvestigatorBoardsOptions } from "../../../mergeInvestigatorBoards";

export type ReplaceBoardPayload = PropsWithBoardId &
	PropsWithBoard &
	Omit<MergeInvestigatorBoardsOptions, "sourceBoard" | "targetBoard">;

export const replaceBoard = createAction<ReplaceBoardPayload>("board/replace");
