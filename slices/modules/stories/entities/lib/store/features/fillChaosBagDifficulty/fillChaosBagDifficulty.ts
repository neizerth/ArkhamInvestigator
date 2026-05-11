import { withRemoteMeta } from "@modules/core/network/shared/lib";
import { createAction } from "@reduxjs/toolkit";

export type FillChaosBagDifficultyPayload = {
	difficultyId: string;
};

export const fillChaosBagDifficulty = createAction(
	"stories/fillChaosBagDifficulty",
	withRemoteMeta<FillChaosBagDifficultyPayload>({
		notify: "all",
	}),
);
