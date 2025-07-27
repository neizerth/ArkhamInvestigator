import { useAppDispatch } from "@shared/lib";
import { useCallback } from "react";
import { UIEvent, type UIEventPayload } from "./store";

type UICallback<T> = (arg: T) => void | false;

type Options<T> = {
	payload: UIEventPayload;
	triggerOnEmpty?: boolean;
	callback?: UICallback<T>;
};

export const useUICallback = <T = void>({
	callback,
	triggerOnEmpty = true,
	payload,
}: Options<T>) => {
	const dispatch = useAppDispatch();

	const cb: UICallback<T> = useCallback(
		(...args) => {
			const canceled = callback?.(...args) === false;
			const triggerAction = triggerOnEmpty || !canceled;

			if (!triggerAction) {
				return;
			}

			dispatch(
				UIEvent({
					...payload,
					canceled,
				}),
			);
		},
		[callback, payload, triggerOnEmpty, dispatch],
	);

	return cb;
};
