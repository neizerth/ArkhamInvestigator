import type { SoundHandler } from "@modules/core/sound/shared/model";

export const handleRegisterSFXWorkers: SoundHandler<string[]> = (
	state,
	payload,
) => {
	state.sfxWorkers = payload.map((id) => ({
		id,
		status: "idle",
	}));
};
