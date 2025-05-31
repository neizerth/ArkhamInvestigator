import { useAppDispatch } from "@shared/lib";
import memoize from "fast-memoize";
import { useCallback } from "react";
import { closeTimingPhase, openTimingPhase } from "../store";

export const useTimingPhase = () => {
	const dispatch = useAppDispatch();

	const open = useCallback(
		memoize((id: number) => () => {
			dispatch(openTimingPhase(id));
		}),
		[],
	);

	const close = useCallback(
		memoize((id: number) => () => {
			dispatch(closeTimingPhase(id));
		}),
		[],
	);

	return {
		open,
		close,
	};
};
