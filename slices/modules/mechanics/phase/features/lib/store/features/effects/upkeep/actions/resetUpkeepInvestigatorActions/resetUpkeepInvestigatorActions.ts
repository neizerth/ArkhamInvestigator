import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import { createAction } from "@reduxjs/toolkit";

export const resetUpkeepInvestigatorActions = createAction<PropsWithBoardId>(
	"phase/resetUpkeepInvestigatorActions",
);
