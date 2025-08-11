import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import { chaosBagPrefix } from "@modules/chaos-bag/base/shared/config";
import type {
	ChaosBagChangeSource,
	ChaosBagToken,
	ChaosTokenType,
} from "@modules/chaos-bag/base/shared/model";
import { createAction } from "@reduxjs/toolkit";

export type RemoveChaosTokensPayload = Partial<PropsWithBoardId> & {
	source?: ChaosBagChangeSource;
} & (
		| {
				removeType: "single";
				token: ChaosBagToken;
		  }
		| {
				removeType: "all" | "type";
				type: ChaosTokenType;
		  }
		| {
				removeType: "multiple";
				type: ChaosTokenType;
				count: number;
		  }
	);

export const removeChaosTokens = createAction<RemoveChaosTokensPayload>(
	`${chaosBagPrefix}/removeChaosTokens`,
);

export const procesChaosTokenRemove = createAction<RemoveChaosTokensPayload>(
	`${chaosBagPrefix}/procesChaosTokenRemove`,
);

export type OpenRemoveChaosTokenConfirmPayload = RemoveChaosTokensPayload & {
	type: ChaosTokenType;
	removeCount: number;
	availableToRemoveCount: number;
};

export const openRemoveChaosTokenConfirm =
	createAction<OpenRemoveChaosTokenConfirmPayload>(
		`${chaosBagPrefix}/openRemoveChaosTokenConfirm`,
	);

export const chaosTokensRemoved = createAction<RemoveChaosTokensPayload>(
	`${chaosBagPrefix}/chaosTokensRemoved`,
);
