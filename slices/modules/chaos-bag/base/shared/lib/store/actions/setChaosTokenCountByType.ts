import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import { createAction } from "@reduxjs/toolkit";
import { chaosBagPrefix } from "../../../config";
import type { ChaosTokenType } from "../../../model";

export type SetChaosTokenByTypePayload = PropsWithBoardId & {
	type: ChaosTokenType;
	count: number;
};

export const setChaosTokenCountByType =
	createAction<SetChaosTokenByTypePayload>(
		`${chaosBagPrefix}/setTokenCountByType`,
	);

export const chaosTokenCountSetByType =
	createAction<SetChaosTokenByTypePayload>(
		`${chaosBagPrefix}/tokenCountSetByType`,
	);
