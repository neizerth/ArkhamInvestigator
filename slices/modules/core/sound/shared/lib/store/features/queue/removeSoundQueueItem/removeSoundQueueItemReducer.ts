import type { SoundReducer } from "@modules/core/sound/shared/model";
import {
	type HandleRemoveSoundQueueItemPayload,
	handleRemoveSoundQueueItem,
} from "./handleRemoveSoundQueueItem";

export const removeSoundQueueItemReducer: SoundReducer<
	HandleRemoveSoundQueueItemPayload
> = (state, { payload }) => {
	handleRemoveSoundQueueItem(state, payload);
};
