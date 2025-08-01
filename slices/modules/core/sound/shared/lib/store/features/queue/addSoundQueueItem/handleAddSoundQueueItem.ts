import type {
	SoundHandler,
	SoundQueueItem,
} from "@modules/core/sound/shared/model";

export const handleAddSoundQueueItem: SoundHandler<SoundQueueItem> = (
	state,
	payload,
) => {
	state.queue.push(payload);
};
