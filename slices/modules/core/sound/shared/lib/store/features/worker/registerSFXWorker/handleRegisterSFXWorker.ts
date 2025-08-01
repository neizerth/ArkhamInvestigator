import type { SoundHandler } from "@modules/core/sound/shared/model";

export type HandleRegisterSFXWorkerPayload = {
	id: string;
};

export const handleRegisterSFXWorker: SoundHandler<
	HandleRegisterSFXWorkerPayload
> = (state, payload) => {
	const { id } = payload;
	state.sfxWorkers.push({
		id,
		status: "idle",
	});
};
