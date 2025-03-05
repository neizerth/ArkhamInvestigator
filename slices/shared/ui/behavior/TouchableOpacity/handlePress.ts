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
  if (pattern) {
    Vibration.vibrate(pattern);
  }
  if (!eventHandler) {
    return;
  }
  eventHandler(event);
}