import { useAppDispatch } from "@shared/lib";
import { useCallback } from "react";
import { COMMON_TOUCH_TYPE_ID } from "../../config";
import type { AbstractTouchCallback, TouchType } from "../../model";
import { touch } from "../store";

type Options<T> = {
	touchActionType?: string;
	touchType: TouchType;
	callback?: AbstractTouchCallback<T>;
};

export function useTouchCallback<T>({
	touchActionType = COMMON_TOUCH_TYPE_ID,
	touchType,
	callback,
}: Options<T>) {
	const dispatch = useAppDispatch();

	const extendedCallback: AbstractTouchCallback<T> = useCallback(
		(...args) => {
			if (!callback) {
				return;
			}
			const enabled = callback(...args);
			const canceled = enabled === false;

			dispatch(
				touch({
					type: touchActionType,
					touchType,
					canceled,
				}),
			);
		},
		[dispatch, touchType, touchActionType, callback],
	);

	return extendedCallback;
}
