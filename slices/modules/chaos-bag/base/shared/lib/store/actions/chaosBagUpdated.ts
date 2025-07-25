import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import { createAction } from "@reduxjs/toolkit";
import { chaosBagPrefix } from "../../../config";

type ChaosBagUpdatedPayload = Partial<PropsWithBoardId>;

export const chaosBagUpdated = createAction<ChaosBagUpdatedPayload>(
	`${chaosBagPrefix}/updated`,
);
