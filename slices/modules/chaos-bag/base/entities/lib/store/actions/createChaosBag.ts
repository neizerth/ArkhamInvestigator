import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import { chaosBagPrefix } from "@modules/chaos-bag/base/shared/config";
import type {
	ChaosBagToken,
	ChaosTokenCount,
} from "@modules/chaos-bag/base/shared/model";
import { createAction } from "@reduxjs/toolkit";

export type CreateChaosBagPayload = Partial<PropsWithBoardId> & {
	tokenCount: ChaosTokenCount;
};

export const createChaosBag = createAction<CreateChaosBagPayload>(
	`${chaosBagPrefix}/create`,
);

export type ChaosBagCreatedPayload = Partial<PropsWithBoardId> & {
	contents: ChaosBagToken[];
};

export const chaosBagCreated = createAction<ChaosBagCreatedPayload>(
	`${chaosBagPrefix}/created`,
);
