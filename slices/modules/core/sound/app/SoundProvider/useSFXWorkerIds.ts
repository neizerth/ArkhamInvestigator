import { useAppDispatch } from "@shared/lib";
import { range } from "ramda";
import { useEffect, useMemo } from "react";
import { v4 } from "uuid";
import { registerSFXWorkers } from "../../shared/lib";

export const useSFXWorkerIds = (count: number) => {
	const dispatch = useAppDispatch();
	const ids = useMemo(() => {
		return range(0, count).map(() => v4());
	}, [count]);

	useEffect(() => {
		dispatch(registerSFXWorkers(ids));
	}, [dispatch, ids]);

	return ids;
};
