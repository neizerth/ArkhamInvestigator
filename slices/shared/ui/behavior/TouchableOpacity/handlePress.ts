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
  pattern
}: HandlePressOptions) => {
  if (!eventHandler) {
    return;
  }
  if (pattern) {
    Vibration.vibrate(pattern);
  }
  eventHandler(event);
}