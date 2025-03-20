import { impactHapticFeedback } from "@features/haptic";
import type { HapticPatternType } from "@shared/model";
import type { GestureResponderEvent } from "react-native";

type PressEventHandler = (e: GestureResponderEvent) => void;

type HandlePressOptions = {
	event: GestureResponderEvent;
	eventHandler?: PressEventHandler;
	pattern?: HapticPatternType;
};

export const handlePress = ({
	event,
	eventHandler,
	pattern = "clockTick",
}: HandlePressOptions) => {
	if (!eventHandler) {
		return;
	}
	impactHapticFeedback(pattern);
	eventHandler(event);
};
