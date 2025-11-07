import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import { chaosBagRevealPrefix } from "@modules/chaos-bag/reveal/base/shared/config";
import type { RevealedChaosBagToken } from "@modules/chaos-bag/reveal/base/shared/model";
import { createAction } from "@reduxjs/toolkit";

export type RevealChaosTokensPayload = PropsWithBoardId & {
	count: number;
	force?: boolean;
};

export const revealChaosTokens = createAction<RevealChaosTokensPayload>(
	`${chaosBagRevealPrefix}/revealChaosTokens`,
);

export type RevealChaosTokensInterruptedPayload = PropsWithBoardId & {
	codes: string[];
};

export const revealChaosTokensInterrupted =
	createAction<RevealChaosTokensInterruptedPayload>(
		`${chaosBagRevealPrefix}/revealChaosTokensInterrupted`,
	);

export type ChaosTokensRevealedPayload = PropsWithBoardId & {
	code: string;
	tokens: RevealedChaosBagToken[];
};

export const chaosTokensRevealed = createAction<ChaosTokensRevealedPayload>(
	`${chaosBagRevealPrefix}/chaosTokensRevealed`,
);
