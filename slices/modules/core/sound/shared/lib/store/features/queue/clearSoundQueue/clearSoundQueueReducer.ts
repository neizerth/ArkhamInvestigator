import type { SoundReducer } from "@modules/core/sound/shared/model";
import { handleClearSoundQueue } from "./handleClearSoundQueue";

export const clearSoundQueueReducer: SoundReducer = (state, { payload }) => {
	handleClearSoundQueue(state, payload);
};
