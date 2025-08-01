import type { SoundHandler } from "@modules/core/sound/shared/model";
import { equals, reject } from "ramda";

export type HandleUnregisterSFXWorkerPayload = {
	id: string;
};

export const handleUnregisterSFXWorker: SoundHandler<
	HandleUnregisterSFXWorkerPayload
> = (state, payload) => {
	const { id } = payload;
	state.sfxWorkers = reject(equals(id), state.sfxWorkers);
};
