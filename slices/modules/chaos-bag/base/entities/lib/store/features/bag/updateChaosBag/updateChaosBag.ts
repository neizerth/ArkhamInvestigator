import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import { chaosBagPrefix } from "@modules/chaos-bag/base/shared/config";
import type { ChaosBagToken } from "@modules/chaos-bag/base/shared/model";
import { createAction } from "@reduxjs/toolkit";

export type UpdateChaosBagPayload = Partial<PropsWithBoardId> | void;

export const updateChaosBag = createAction<UpdateChaosBagPayload>(
	`${chaosBagPrefix}/update`,
);

export type ChaosBagUpdatedPayload = Partial<PropsWithBoardId> & {
	contents: ChaosBagToken[];
};

export const chaosBagUpdated = createAction<ChaosBagUpdatedPayload>(
	`${chaosBagPrefix}/updated`,
);
