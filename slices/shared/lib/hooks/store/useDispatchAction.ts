import type { AppThunk } from "@shared/model";
import { useCallback } from "react";
import { useAppDispatch } from "./useAppDispatch";

export const useDispatchAction = <T>(actionCreator: (value: T) => AppThunk) => {
	const dispatch = useAppDispatch();

	return useCallback(
		(value: T) => {
			dispatch(actionCreator(value));
		},
		[actionCreator, dispatch],
	);
};
