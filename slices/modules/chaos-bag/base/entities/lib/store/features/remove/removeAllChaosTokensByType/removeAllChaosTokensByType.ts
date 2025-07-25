import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import { chaosBagPrefix } from "@modules/chaos-bag/base/shared/config";
import type {
	ChaosBagChangeSource,
	ChaosTokenType,
} from "@modules/chaos-bag/base/shared/model";
import { createAction } from "@reduxjs/toolkit";

export type RemoveAllChaosTokensByTypePayload = Partial<PropsWithBoardId> & {
	source?: ChaosBagChangeSource;
	type: ChaosTokenType;
};

export const removeAllChaosTokensByType =
	createAction<RemoveAllChaosTokensByTypePayload>(
		`${chaosBagPrefix}/removeAllChaosTokensByType`,
	);

export const allChaosTokensByTypeRemoved =
	createAction<RemoveAllChaosTokensByTypePayload>(
		`${chaosBagPrefix}/allChaosTokensByTypeRemoved`,
	);
