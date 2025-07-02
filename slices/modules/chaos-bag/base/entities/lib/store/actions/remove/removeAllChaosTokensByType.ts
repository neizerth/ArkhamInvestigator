import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import { chaosBagPrefix } from "@modules/chaos-bag/base/shared/config";
import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import { createAction } from "@reduxjs/toolkit";

export type RemoveAllChaosTokenPayload = Partial<PropsWithBoardId> & {
	type: ChaosTokenType;
};

export const removeAllChaosTokensByType =
	createAction<RemoveAllChaosTokenPayload>(
		`${chaosBagPrefix}/removeAllTokensByType`,
	);

export const allChaosTokensRemovedByType =
	createAction<RemoveAllChaosTokenPayload>(
		`${chaosBagPrefix}/tokensRemovedByType`,
	);
