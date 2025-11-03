import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import { createAction } from "@reduxjs/toolkit";

export const giveUpkeepResourceToBoard = createAction<PropsWithBoardId>(
	"phase/giveUpkeepResourceToBoard",
);
