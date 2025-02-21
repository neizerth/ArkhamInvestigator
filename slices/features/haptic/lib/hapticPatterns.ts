import { Vibration } from "react-native";
import { TICK_PATTERN } from "../config";
import type { HapticPattern } from "@shared/model/device/haptic";

export const withVibrationPattern = (
  pattern: HapticPattern, 
  repeat = false
) => () => Vibration.vibrate(pattern, repeat);

export const tick = withVibrationPattern(TICK_PATTERN);