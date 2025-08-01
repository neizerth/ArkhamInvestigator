import { useEffect } from "react";

export type SFXWorkerProps = {
	id: string;
};

export const SFXWorker = ({ id }: SFXWorkerProps) => {
	useEffect(() => {
		console.log("sound worker registered", id);

		return () => {
			console.log("sound worker unregistered", id);
		};
	}, [id]);

	return null;
};
