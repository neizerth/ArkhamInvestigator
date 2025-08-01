import type { SoundHandler } from "@modules/core/sound/shared/model";
import { whereId } from "@shared/lib/util";
import { reject } from "ramda";

export type HandleUnregisterSFXWorkerPayload = {
	id: string;
};

export const handleUnregisterSFXWorker: SoundHandler<
	HandleUnregisterSFXWorkerPayload
> = (state, payload) => {
	const { id } = payload;
	state.sfxWorkers = reject(whereId(id), state.sfxWorkers);
};
