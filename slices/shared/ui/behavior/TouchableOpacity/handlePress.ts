import { TICK_PATTERN } from "@features/haptic";
import type { HapticPattern } from "@shared/model";
import { type GestureResponderEvent, Vibration } from "react-native";

type PressEventHandler = (e: GestureResponderEvent) => void

type HandlePressOptions = {
  event: GestureResponderEvent
  eventHandler?: PressEventHandler
  pattern?: HapticPattern
}

export const handlePress = ({
  event,
  eventHandler, 
  pattern = TICK_PATTERN
}: HandlePressOptions) => {
  if (!eventHandler) {
    return;
  }

  Vibration.vibrate(pattern);
  eventHandler(event);
}