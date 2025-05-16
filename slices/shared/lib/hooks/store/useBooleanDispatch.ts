import type { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import type { AppThunk } from "@shared/model";
import { useMemo } from "react";
import { useAppDispatch } from "./dispatch/useAppDispatch";

type ActionCreator =
	| ActionCreatorWithPayload<boolean>
	| ((value: boolean) => AppThunk);
export const useBooleanDispatch = (setValue: ActionCreator) => {
	const dispatch = useAppDispatch();

	return useMemo(
		() => ({
			put: setValue,
			on: () => dispatch(setValue(true)),
			off: () => dispatch(setValue(false)),
		}),
		[dispatch, setValue],
	);
};
