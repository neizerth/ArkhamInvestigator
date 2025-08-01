import {
	registerSFXWorker,
	unregisterSFXWorker,
} from "@modules/core/sound/shared/lib";
import { useAppDispatch } from "@shared/lib";
import { useEffect } from "react";

export const useSFXWorkerRegistration = (id: string) => {
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(registerSFXWorker({ id }));
		return () => {
			dispatch(unregisterSFXWorker({ id }));
		};
	}, [id, dispatch]);
};
