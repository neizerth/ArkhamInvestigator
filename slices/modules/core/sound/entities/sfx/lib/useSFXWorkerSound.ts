import {
	selectSFXWorkerById,
	selectSFXWorkerTask,
	useSound,
} from "@modules/core/sound/shared/lib";
import { useAppDispatch, useAppSelector } from "@shared/lib";
import { useCallback, useEffect } from "react";
import { soundPlayEnd, soundPlayStarted } from "../../base/lib";

export const useSFXWorkerSound = (workerId: string) => {
	const dispatch = useAppDispatch();

	const task = useAppSelector(selectSFXWorkerTask(workerId));
	const worker = useAppSelector(selectSFXWorkerById(workerId));

	const onFinish = useCallback(async () => {
		if (!task || !worker) {
			return;
		}

		dispatch(
			soundPlayEnd({
				taskId: task.id,
				soundId: task.soundId,
				workerId: task.workerId,
			}),
		);
	}, [dispatch, task, worker]);

	const play = useSound({
		id: task?.soundId,
		onFinish,
		preload: true,
	});

	useEffect(() => {
		if (task?.status !== "idle" || worker?.status !== "idle") {
			return;
		}

		dispatch(
			soundPlayStarted({
				taskId: task.id,
				soundId: task.soundId,
				workerId: task.workerId,
			}),
		);
		play();
	}, [dispatch, task, play, worker]);
};
