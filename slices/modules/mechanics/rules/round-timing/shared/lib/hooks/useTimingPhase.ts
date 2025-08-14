import { useAppDispatch, useAppSelector } from "@shared/lib";
import memoize from "fast-memoize";
import { useCallback } from "react";
import {
	closeTimingPhase,
	openTimingPhase,
	selectOpenTimingPhases,
} from "../store";

export const useTimingPhase = () => {
	const dispatch = useAppDispatch();
	const openPhases = useAppSelector(selectOpenTimingPhases);

	const openPhase = useCallback(
		memoize((id: number) => () => {
			dispatch(openTimingPhase(id));
		}),
		[],
	);

	const closePhase = useCallback(
		memoize((id: number) => () => {
			dispatch(closeTimingPhase(id));
		}),
		[],
	);

	const isPhaseOpen = useCallback(
		(id: number) => openPhases?.includes(id),
		[openPhases],
	);

	return {
		isPhaseOpen,
		openPhase,
		closePhase,
	};
};
