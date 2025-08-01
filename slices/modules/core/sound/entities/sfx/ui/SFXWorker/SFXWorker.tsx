import { useSFXWorker } from "../../lib/useSFXWorker";

export type SFXWorkerProps = {
	id: string;
};

export const SFXWorker = ({ id }: SFXWorkerProps) => {
	useSFXWorker(id);

	return null;
};
