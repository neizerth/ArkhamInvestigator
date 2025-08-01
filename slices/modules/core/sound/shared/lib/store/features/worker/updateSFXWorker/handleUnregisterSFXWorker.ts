import type {
	SFXWorkerData,
	SoundHandler,
} from "@modules/core/sound/shared/model";
import { whereId } from "@shared/lib/util";

export type UpdateSFXWorkerPayload = {
	id: string;
	data: SFXWorkerData;
};

export const handleUpdateSFXWorker: SoundHandler<UpdateSFXWorkerPayload> = (
	state,
	payload,
) => {
	const { id, data } = payload;
	const index = state.sfxWorkers.findIndex(whereId(id));

	state.sfxWorkers[index] = {
		...state.sfxWorkers[index],
		...data,
	};
};
