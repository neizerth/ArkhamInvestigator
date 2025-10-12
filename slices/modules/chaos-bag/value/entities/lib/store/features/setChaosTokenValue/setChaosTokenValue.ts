import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import { chaosTokenValuePrefix } from "@modules/chaos-bag/value/shared/config";
import type { ChaosTokenValue } from "@modules/chaos-bag/value/shared/model";
import { createAction } from "@reduxjs/toolkit";

export type SetChaosTokenValuePayload = PropsWithBoardId & {
	id?: string;
	type: ChaosTokenType;
	value: ChaosTokenValue;
};

export const setChaosTokenValue = createAction<SetChaosTokenValuePayload>(
	`${chaosTokenValuePrefix}/setValue`,
);
