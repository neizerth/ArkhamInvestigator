import { impactHapticFeedback } from "@features/haptic";
import type { HapticPatternType } from "@shared/model";
import type { GestureResponderEvent } from "react-native";

type PressEventHandler = (e: GestureResponderEvent) => void | boolean;

type HandlePressOptions = {
	event: GestureResponderEvent;
	eventHandler?: PressEventHandler;
	impactFeedback: () => void
};

export const handlePress = ({
	event,
	eventHandler,
	impactFeedback
}: HandlePressOptions) => {
	if (!eventHandler) {
		return;
	}
	if (eventHandler(event) !== false) {
		impactFeedback();
	}
};
