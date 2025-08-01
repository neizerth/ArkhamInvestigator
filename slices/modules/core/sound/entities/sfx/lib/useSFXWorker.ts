import { useSFXWorkerRegistration } from "./useSFXWorkerRegistration";
import { useSFXWorkerSound } from "./useSFXWorkerSound";

export const useSFXWorker = (id: string) => {
	useSFXWorkerRegistration(id);
	useSFXWorkerSound(id);
};
