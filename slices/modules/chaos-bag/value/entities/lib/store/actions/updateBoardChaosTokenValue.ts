import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import { chaosBagValuePrefix } from "@modules/chaos-bag/value/shared/config";
import { createAction } from "@reduxjs/toolkit";

export type UpdateBoardChaosTokenValue = PropsWithBoardId & {
	type: ChaosTokenType;
	value: number;
};

export const updateBoardChaosTokenValue =
	createAction<UpdateBoardChaosTokenValue>(
		`${chaosBagValuePrefix}/updateBoardValue`,
	);
