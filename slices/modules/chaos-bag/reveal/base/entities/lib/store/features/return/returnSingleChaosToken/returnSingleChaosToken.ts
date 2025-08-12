import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import type { ChaosBagToken } from "@modules/chaos-bag/base/shared/model";
import { chaosBagRevealPrefix } from "@modules/chaos-bag/reveal/base/shared/config";
import { createAction } from "@reduxjs/toolkit";

export type ReturnSingleChaosTokenPayload = Partial<PropsWithBoardId> & {
	id: string;
};

export const returnSingleChaosToken =
	createAction<ReturnSingleChaosTokenPayload>(
		`${chaosBagRevealPrefix}/returnSingleChaosToken`,
	);

export type SingleChaosTokenReturnedPayload = {
	token: ChaosBagToken;
};

export const singleChaosTokenReturned =
	createAction<SingleChaosTokenReturnedPayload>(
		`${chaosBagRevealPrefix}/singleChaosTokenReturned`,
	);
