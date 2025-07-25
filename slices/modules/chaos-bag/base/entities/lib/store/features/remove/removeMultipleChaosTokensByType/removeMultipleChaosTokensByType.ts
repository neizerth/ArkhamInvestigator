import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import { chaosBagPrefix } from "@modules/chaos-bag/base/shared/config";
import type {
	ChaosBagChangeSource,
	ChaosTokenType,
} from "@modules/chaos-bag/base/shared/model";
import { createAction } from "@reduxjs/toolkit";

export type RemoveMultipleChaosTokensByTypePayload =
	Partial<PropsWithBoardId> & {
		source?: ChaosBagChangeSource;
		type: ChaosTokenType;
		count: number;
	};

export const removeMultipleChaosTokensByType =
	createAction<RemoveMultipleChaosTokensByTypePayload>(
		`${chaosBagPrefix}/removeMultipleTokensByType`,
	);

export const multipleChaosTokensRemovedByType =
	createAction<RemoveMultipleChaosTokensByTypePayload>(
		`${chaosBagPrefix}/multipleChaosTokensRemovedByType`,
	);

export type CantRemoveMultipleChaosTokensByTypePayload =
	RemoveMultipleChaosTokensByTypePayload & {
		count: number;
		available: number;
	};

export const cantRemoveMultipleChaosTokensByType =
	createAction<CantRemoveMultipleChaosTokensByTypePayload>(
		`${chaosBagPrefix}/cantRemoveMultipleTokensByType`,
	);
