import type { AppActionCreator } from "@shared/model";
import { useCallback } from "react";
import { useAppDispatch } from "./useAppDispatch";

export const useDispatchAction = <T>(actionCreator: AppActionCreator<T>) => {
	const dispatch = useAppDispatch();

	return useCallback(
		(value: T) => {
			dispatch(actionCreator(value));
		},
		[actionCreator, dispatch],
	);
};
