import { Vibration } from "react-native";
import { TICK_PATTERN } from "../config";

export const withVibrationPattern = (pattern: number | number[]) => () => Vibration.vibrate(pattern);

export const tick = withVibrationPattern(TICK_PATTERN);