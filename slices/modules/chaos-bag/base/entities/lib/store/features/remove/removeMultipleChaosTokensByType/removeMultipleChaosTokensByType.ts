import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import { chaosBagPrefix } from "@modules/chaos-bag/base/shared/config";
import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import { createAction } from "@reduxjs/toolkit";

export type RemoveMultipleChaosTokensByTypePayload =
	Partial<PropsWithBoardId> & {
		type: ChaosTokenType;
		count: number;
	};

export const removeMultipleChaosTokensByType =
	createAction<RemoveMultipleChaosTokensByTypePayload>(
		`${chaosBagPrefix}/removeMultipleTokensByType`,
	);

export const multipleChaosTokensByTypeRemoved =
	createAction<RemoveMultipleChaosTokensByTypePayload>(
		`${chaosBagPrefix}/multipleChaosTokensByTypeRemoved`,
	);

export const cantRemoveMultipleChaosTokens =
	createAction<RemoveMultipleChaosTokensByTypePayload>(
		`${chaosBagPrefix}/cantRemoveMultipleTokens`,
	);
