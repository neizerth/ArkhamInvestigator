import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import { chaosBagRevealPrefix } from "@modules/chaos-bag/reveal/base/shared/config";
import type { RevealedChaosBagToken } from "@modules/chaos-bag/reveal/base/shared/model";
import { withRemoteMeta } from "@modules/core/network/shared/lib";
import { createAction } from "@reduxjs/toolkit";

export type RevealChaosTokensPayload = PropsWithBoardId & {
	tokens: RevealedChaosBagToken[];
	force?: boolean;
	unseal?: boolean;
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
	manual?: boolean;
};

export const chaosTokensRevealed = createAction(
	`${chaosBagRevealPrefix}/chaosTokensRevealed`,
	withRemoteMeta<ChaosTokensRevealedPayload>({
		notify: "all",
	}),
);
