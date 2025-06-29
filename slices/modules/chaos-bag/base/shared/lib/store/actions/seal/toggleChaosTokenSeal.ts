import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import { createAction } from "@reduxjs/toolkit";
import { chaosBagPrefix } from "../../../../config";

export type ToggleChaosTokenSealPayload = PropsWithBoardId & {
	id: string;
};

export const toggleChaosTokenSeal = createAction<ToggleChaosTokenSealPayload>(
	`${chaosBagPrefix}/toggleTokenSeal`,
);
