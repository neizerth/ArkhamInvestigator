import type { SoundHandler } from "@modules/core/sound/shared/model";
import { whereId } from "@shared/lib";
import { reject } from "ramda";

export const handleRemoveSoundQueueItem: SoundHandler<string> = (state, id) => {
	state.queue = reject(whereId(id), state.queue);
};
