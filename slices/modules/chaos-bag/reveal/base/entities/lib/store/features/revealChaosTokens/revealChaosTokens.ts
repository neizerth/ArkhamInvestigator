import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import { chaosBagRevealPrefix } from "@modules/chaos-bag/reveal/base/shared/config";
import type { RevealedChaosBagToken } from "@modules/chaos-bag/reveal/base/shared/model";
import { createAction } from "@reduxjs/toolkit";

export type RevealChaosTokensPayload = PropsWithBoardId & {
	count: number;
};

export const revealChaosTokens = createAction<RevealChaosTokensPayload>(
	`${chaosBagRevealPrefix}/revealChaosTokens`,
);

export type ChaosTokensRevealedPayload = PropsWithBoardId & {
	tokens: RevealedChaosBagToken[];
};

export const chaosTokensRevealed = createAction<ChaosTokensRevealedPayload>(
	`${chaosBagRevealPrefix}/chaosTokensRevealed`,
);
