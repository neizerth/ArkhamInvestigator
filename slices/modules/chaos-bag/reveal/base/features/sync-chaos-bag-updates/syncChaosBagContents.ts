import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import { createAction } from "@reduxjs/toolkit";
import { chaosBagRevealPrefix } from "../../shared/config";

export const syncChaosBagContents = createAction<PropsWithBoardId>(
	`${chaosBagRevealPrefix}/syncChaosBagContents`,
);
