import { range } from "ramda";
import { useMemo } from "react";
import { v4 } from "uuid";

export const useSFXWorkerIds = (count: number) => {
	return useMemo(() => {
		return range(0, count).map(() => v4());
	}, [count]);
};
