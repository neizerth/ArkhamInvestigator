import type { SoundId } from "@modules/core/sound/shared/model";
import { createAction } from "@reduxjs/toolkit";

export type SoundPlayStarted = {
	workerId: string;
	soundId: SoundId;
};

export const soundPlayStarted =
	createAction<SoundPlayStarted>("sound/playStarted");
