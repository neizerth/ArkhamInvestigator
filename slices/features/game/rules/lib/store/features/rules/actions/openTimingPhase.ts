import type { AppThunk } from "@shared/model";
import { selectOpenTimingPhases, setOpenTimingPhases } from "../rules";

export const openTimingPhase =
	(id: number): AppThunk =>
	(dispatch, getState) => {
		const state = getState();
		const open = selectOpenTimingPhases(state) || [];

		dispatch(setOpenTimingPhases([...open, id]));
	};
