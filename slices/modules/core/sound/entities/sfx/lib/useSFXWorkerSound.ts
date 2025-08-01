import { selectSFXWorkerTask, useSound } from "@modules/core/sound/shared/lib";
import { useAppDispatch, useAppSelector } from "@shared/lib";
import { useCallback, useEffect } from "react";
import { soundPlayEnd, soundPlayStarted } from "../../base/lib";

export const useSFXWorkerSound = (workerId: string) => {
	const dispatch = useAppDispatch();

	const task = useAppSelector(selectSFXWorkerTask(workerId));
	const soundId = task?.soundId;

	const onFinish = useCallback(() => {
		if (!soundId) {
			return;
		}

		dispatch(
			soundPlayEnd({
				soundId,
				workerId,
			}),
		);
	}, [dispatch, workerId, soundId]);

	const play = useSound({
		id: soundId,
		onFinish,
	});

	useEffect(() => {
		if (task?.status !== "idle" || !soundId) {
			return;
		}

		dispatch(
			soundPlayStarted({
				soundId,
				workerId,
			}),
		);

		play();
	}, [dispatch, task?.status, play, soundId, workerId]);
};
