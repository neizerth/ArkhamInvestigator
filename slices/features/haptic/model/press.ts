import type { GestureResponderEvent } from "react-native";
import type { HapticPatternType } from "./haptic";

export type PressProps = {
	pressHapticPattern?: HapticPatternType;
	pressInHapticPattern?: HapticPatternType;
	pressOutHapticPattern?: HapticPatternType;
	longPressHapticPattern?: HapticPatternType;
};

export type PressHandler =
	| ((event: GestureResponderEvent) => void | false)
	| null;
