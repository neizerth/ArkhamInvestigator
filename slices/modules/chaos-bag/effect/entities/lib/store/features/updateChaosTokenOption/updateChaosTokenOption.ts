import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import { chaosBagEffectPrefix } from "@modules/chaos-bag/effect/shared/config";
import { createAction } from "@reduxjs/toolkit";

export type UpdateChaosTokenOptionPayload = PropsWithBoardId & {
	type: ChaosTokenType;
	index: number;
	selected?: boolean;
	source?: "ui" | "effect";
};

export const updateChaosTokenOption =
	createAction<UpdateChaosTokenOptionPayload>(
		`${chaosBagEffectPrefix}/updateChaosTokenOption`,
	);

export const chaosTokenOptionUpdated =
	createAction<UpdateChaosTokenOptionPayload>(
		`${chaosBagEffectPrefix}/chaosTokenOptionUpdated`,
	);
