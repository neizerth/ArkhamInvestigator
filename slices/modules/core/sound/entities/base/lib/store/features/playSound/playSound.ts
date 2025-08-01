import type { SoundId } from "@modules/core/sound/shared/model";
import { createAction } from "@reduxjs/toolkit";

export const playSound = createAction<SoundId>("sound/play");
