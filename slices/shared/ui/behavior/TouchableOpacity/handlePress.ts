import type { HapticPattern } from "@shared/model";
import type { AudioPlayer } from "expo-audio";
import { type GestureResponderEvent, Vibration } from "react-native";

type PressEventHandler = (e: GestureResponderEvent) => void

type HandlePressOptions = {
  event: GestureResponderEvent
  eventHandler?: PressEventHandler
  pattern?: HapticPattern
  sound?: AudioPlayer
}

export const handlePress = ({
  event,
  eventHandler, 
  sound,
  pattern
}: HandlePressOptions) => {
  if (!eventHandler) {
    return;
  }
  if (pattern) {
    Vibration.vibrate(pattern);
  }
  if (sound) {
    sound.play();
  }
  eventHandler(event);
}