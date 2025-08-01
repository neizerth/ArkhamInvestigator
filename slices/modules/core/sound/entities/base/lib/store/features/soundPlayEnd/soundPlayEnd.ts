import type { SoundId } from "@modules/core/sound/shared/model";
import { createAction } from "@reduxjs/toolkit";

export type SoundPlayEndPayload = {
	workerId: string;
	soundId: SoundId;
};

export const soundPlayEnd = createAction<SoundPlayEndPayload>("sound/playEnd");
