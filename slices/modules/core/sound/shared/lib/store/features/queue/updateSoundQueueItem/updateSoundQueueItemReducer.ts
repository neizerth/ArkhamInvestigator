import type { SoundReducer } from "@modules/core/sound/shared/model";
import {
	type HandleUpdateSoundQueueItemPayload,
	handleUpdateSoundQueueItem,
} from "./handleUpdateSoundQueueItem";

export const updateSoundQueueItemReducer: SoundReducer<
	HandleUpdateSoundQueueItemPayload
> = (state, { payload }) => {
	handleUpdateSoundQueueItem(state, payload);
};
