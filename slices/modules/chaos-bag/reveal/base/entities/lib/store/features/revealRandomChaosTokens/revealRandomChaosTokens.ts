import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import { chaosBagRevealPrefix } from "@modules/chaos-bag/reveal/base/shared/config";
import type { RevealedChaosBagToken } from "@modules/chaos-bag/reveal/base/shared/model";
import { createAction } from "@reduxjs/toolkit";

export type RevealRandomChaosTokensPayload = PropsWithBoardId & {
	count: number;
	force?: boolean;
};

export const revealRandomChaosTokens =
	createAction<RevealRandomChaosTokensPayload>(
		`${chaosBagRevealPrefix}/revealRandomChaosTokens`,
	);

export type RandomChaosTokensRevealedPayload = PropsWithBoardId & {
	code: string;
	tokens: RevealedChaosBagToken[];
};

export const randomChaosTokensRevealed =
	createAction<RandomChaosTokensRevealedPayload>(
		`${chaosBagRevealPrefix}/randomChaosTokensRevealed`,
	);
