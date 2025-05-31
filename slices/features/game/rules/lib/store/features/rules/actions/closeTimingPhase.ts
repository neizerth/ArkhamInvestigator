import type { AppThunk } from "@shared/model";
import { equals, reject } from "ramda";
import { selectOpenTimingPhases, setOpenTimingPhases } from "../rules";

export const closeTimingPhase =
	(id: number): AppThunk =>
	(dispatch, getState) => {
		const state = getState();
		const open = selectOpenTimingPhases(state) || [];

		const data = reject(equals(id), open);
		dispatch(setOpenTimingPhases(data));
	};
