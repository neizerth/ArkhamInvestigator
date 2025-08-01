import {
	registerSFXWorker,
	unregisterSFXWorker,
} from "@modules/core/sound/shared/lib";
import { useAppDispatch } from "@shared/lib";
import { useEffect } from "react";

export type SFXWorkerProps = {
	id: string;
};

export const SFXWorker = ({ id }: SFXWorkerProps) => {
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(registerSFXWorker({ id }));
		return () => {
			dispatch(unregisterSFXWorker({ id }));
		};
	}, [id, dispatch]);

	return null;
};
