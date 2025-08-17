import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import { chaosBagRevealPrefix } from "@modules/chaos-bag/reveal/base/shared/config";
import type { ChaosBagRevealState } from "@modules/chaos-bag/reveal/base/shared/lib";
import { createAction } from "@reduxjs/toolkit";

export type EndChaosBagRevealPayload = Partial<PropsWithBoardId>;

export const endChaosBagReveal = createAction<EndChaosBagRevealPayload>(
	`${chaosBagRevealPrefix}/end`,
);

export type ChaosBagRevealEndPayload = EndChaosBagRevealPayload &
	Omit<ChaosBagRevealState, "failed"> & {
		failed: boolean;
	};

export const chaosBagRevealEnd = createAction<ChaosBagRevealEndPayload>(
	`${chaosBagRevealPrefix}/revealEnd`,
);
