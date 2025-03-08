import { fallbackWebPatterns, TICK_PATTERN } from "@features/haptic/config";
import type { HapticOptions } from "react-native-haptic-feedback";
import { vibrate } from "../vibrate";
import type { HapticFeedbackType } from "@shared/model";

const Haptics = {
  trigger(
    type: HapticFeedbackType = 'selection',
    _: HapticOptions = {}
  ) {
    const pattern = fallbackWebPatterns[type] || TICK_PATTERN;
    return vibrate(pattern);
  }
}

export const { trigger } = Haptics;

export default Haptics;