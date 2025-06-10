import type { GestureResponderEvent } from "react-native";
import type { PressHandler } from "../../model";

type HandlePressOptions = {
	event: GestureResponderEvent;
	eventHandler?: PressHandler;
	impactFeedback: () => void;
};

export const handlePress = ({
	event,
	eventHandler,
	impactFeedback,
}: HandlePressOptions) => {
	if (!eventHandler) {
		return;
	}
	if (eventHandler(event) !== false) {
		impactFeedback();
	}
};
