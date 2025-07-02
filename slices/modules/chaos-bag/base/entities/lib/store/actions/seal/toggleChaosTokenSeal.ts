import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import { chaosBagPrefix } from "@modules/chaos-bag/base/shared/config";
import { createAction } from "@reduxjs/toolkit";

export type ToggleChaosTokenSealPayload = Partial<PropsWithBoardId> & {
	id: string;
};

export const toggleChaosTokenSeal = createAction<ToggleChaosTokenSealPayload>(
	`${chaosBagPrefix}/toggleTokenSeal`,
);
