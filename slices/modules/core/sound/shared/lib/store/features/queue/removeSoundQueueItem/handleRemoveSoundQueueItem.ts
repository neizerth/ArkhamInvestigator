import type { SoundHandler } from "@modules/core/sound/shared/model";
import { whereId } from "@shared/lib";
import { reject } from "ramda";

export type HandleRemoveSoundQueueItemPayload = {
	id: string;
};

export const handleRemoveSoundQueueItem: SoundHandler<
	HandleRemoveSoundQueueItemPayload
> = (state, payload) => {
	const { id } = payload;
	state.queue = reject(whereId(id), state.queue);
};
