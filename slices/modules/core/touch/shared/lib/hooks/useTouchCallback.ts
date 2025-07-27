import { useAppDispatch } from "@shared/lib";
import { useCallback } from "react";
import { COMMON_PRESS_TYPE_ID } from "../../config";
import type { AbstractTouchCallback, TouchType } from "../../model";
import { touchActions } from "../store";

type Options<T> = {
	touchActionType?: string;
	touchType: TouchType;
	callback?: AbstractTouchCallback<T>;
};

export function useTouchCallback<T>({
	touchActionType = COMMON_PRESS_TYPE_ID,
	touchType,
	callback,
}: Options<T>) {
	const dispatch = useAppDispatch();
	const action = touchActions[touchType];

	const extendedCallback: AbstractTouchCallback<T> = useCallback(
		(...args) => {
			if (!callback) {
				return;
			}
			const response = callback(...args);
			if (response === false) {
				return;
			}
			dispatch(
				action({
					touchType: touchActionType,
				}),
			);
		},
		[dispatch, action, touchActionType, callback],
	);

	return extendedCallback;
}
