import type { SoundReducer } from "@modules/core/sound/shared/model";
import { handleRemoveSoundQueueItem } from "./handleRemoveSoundQueueItem";

export const removeSoundQueueItemReducer: SoundReducer<string> = (
	state,
	{ payload },
) => {
	handleRemoveSoundQueueItem(state, payload);
};
