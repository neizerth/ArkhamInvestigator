import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import { createAction } from "@reduxjs/toolkit";
import type { GameType } from "../../shared/model";

export type OpenNewGameWarningPayload = PropsWithBoardId & {
	type: GameType;
};

export const openNewGameWarning = createAction<OpenNewGameWarningPayload>(
	"game/openNewGameWarning",
);
