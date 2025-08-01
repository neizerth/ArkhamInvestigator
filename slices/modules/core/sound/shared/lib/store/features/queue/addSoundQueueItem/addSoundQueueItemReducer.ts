import type {
	SoundQueueItem,
	SoundReducer,
} from "@modules/core/sound/shared/model";
import { handleAddSoundQueueItem } from "./handleAddSoundQueueItem";

export const addSoundQueueItemReducer: SoundReducer<SoundQueueItem> = (
	state,
	{ payload },
) => {
	handleAddSoundQueueItem(state, payload);
};
