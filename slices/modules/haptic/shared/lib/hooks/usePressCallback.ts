import { useCallback } from "react";
import type { GestureResponderEvent } from "react-native";
import type { PressHandler } from "../../../shared/model";
import { handlePress } from "../handlePress";

type Options = {
	eventHandler?: PressHandler;
	impactFeedback: () => void;
};
export const usePressCallback = ({ eventHandler, impactFeedback }: Options) => {
	return useCallback(
		(event: GestureResponderEvent) =>
			handlePress({
				event,
				eventHandler,
				impactFeedback,
			}),
		[eventHandler, impactFeedback],
	);
};
