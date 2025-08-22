import type { GoToPagePayload } from "@modules/core/router/shared/lib";
import { useAppDispatch } from "@shared/lib";
import { useCallback } from "react";
import { leaveBoard } from "./leaveBoard";

export const useLeaveBoard = () => {
	const dispatch = useAppDispatch();

	return useCallback(
		(payload: GoToPagePayload) => () => {
			dispatch(leaveBoard(payload));
		},
		[dispatch],
	);
};
