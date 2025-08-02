import type { SoundHandler } from "@modules/core/sound/shared/model";

export const handleClearSoundQueue: SoundHandler = (state) => {
	state.queue = [];
};
