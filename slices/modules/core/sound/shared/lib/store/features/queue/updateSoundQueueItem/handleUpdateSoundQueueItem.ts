import type {
	SoundHandler,
	SoundQueueItem,
} from "@modules/core/sound/shared/model";

export type HandleUpdateSoundQueueItemPayload = {
	id: string;
	data: Partial<SoundQueueItem>;
};

export const handleUpdateSoundQueueItem: SoundHandler<
	HandleUpdateSoundQueueItemPayload
> = (state, payload) => {
	const queue = state.queue || [];
	const { id, data } = payload;
	state.queue = queue.map((item) => {
		if (item.id !== id) {
			return item;
		}
		return {
			...item,
			...data,
		};
	});
};
