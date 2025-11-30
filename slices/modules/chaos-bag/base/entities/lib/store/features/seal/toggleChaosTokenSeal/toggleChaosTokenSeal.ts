import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import { chaosBagPrefix } from "@modules/chaos-bag/base/shared/config";
import { createAction } from "@reduxjs/toolkit";

export type ToggleChaosTokenSealPayload = PropsWithBoardId & {
	id: string;
	returnToRevealModal?: boolean;
};

export const toggleChaosTokenSeal = createAction<ToggleChaosTokenSealPayload>(
	`${chaosBagPrefix}/toggleTokenSeal`,
);
