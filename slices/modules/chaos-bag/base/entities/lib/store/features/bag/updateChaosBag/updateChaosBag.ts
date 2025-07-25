import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import { chaosBagPrefix } from "@modules/chaos-bag/base/shared/config";
import type {
	ChaosBagChangeSource,
	ChaosBagToken,
} from "@modules/chaos-bag/base/shared/model";
import { createAction } from "@reduxjs/toolkit";

export type UpdateChaosBagPayload = Partial<PropsWithBoardId> & {
	source?: ChaosBagChangeSource;
};

export const updateChaosBag = createAction<UpdateChaosBagPayload>(
	`${chaosBagPrefix}/update`,
);

export type ChaosBagUpdatedPayload = Partial<PropsWithBoardId> & {
	contents: ChaosBagToken[];
};
