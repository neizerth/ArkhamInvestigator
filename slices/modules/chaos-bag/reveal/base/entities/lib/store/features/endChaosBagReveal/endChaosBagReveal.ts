import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import { chaosBagRevealPrefix } from "@modules/chaos-bag/reveal/base/shared/config";
import type { ChaosBagRevealState } from "@modules/chaos-bag/reveal/base/shared/lib";
import { createAction } from "@reduxjs/toolkit";

export type EndChaosBagRevealPayload = Partial<PropsWithBoardId>;

export const endChaosBagReveal = createAction<EndChaosBagRevealPayload>(
	`${chaosBagRevealPrefix}/end`,
);

export type ChaosBagRevealEndPayload<T = unknown> = EndChaosBagRevealPayload &
	Omit<ChaosBagRevealState, "failed" | "skillCheckData"> & {
		failed: boolean | null;
		skillCheckData: T;
	};

export const chaosBagRevealEnd = createAction<ChaosBagRevealEndPayload>(
	`${chaosBagRevealPrefix}/revealEnd`,
);
