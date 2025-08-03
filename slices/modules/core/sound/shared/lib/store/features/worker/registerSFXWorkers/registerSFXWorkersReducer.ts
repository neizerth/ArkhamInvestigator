import type { SoundReducer } from "@modules/core/sound/shared/model";
import { handleRegisterSFXWorkers } from "./handleRegisterSFXWorkers";

export const registerSFXWorkersReducer: SoundReducer<string[]> = (
	state,
	{ payload },
) => {
	handleRegisterSFXWorkers(state, payload);
};
