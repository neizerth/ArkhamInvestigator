import { createAction } from "@reduxjs/toolkit";

export type FillChaosBagDifficultyPayload = {
	difficultyId: string;
};

export const fillChaosBagDifficulty =
	createAction<FillChaosBagDifficultyPayload>("stories/fillChaosBagDifficulty");
