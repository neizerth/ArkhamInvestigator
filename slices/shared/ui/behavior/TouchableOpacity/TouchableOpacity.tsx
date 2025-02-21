import type { HapticPattern } from "@shared/model/device/haptic";
import { useCallback } from "react";
import type { 
  GestureResponderEvent, 
  TouchableOpacityProps as BaseTouchableOpacityProps
} from "react-native";

import { 
  TouchableOpacity as BaseTouchableOpacity
} from 'react-native';

import { handlePress } from "./handlePress";
import { type AudioSource, useAudioPlayer } from 'expo-audio';

export type TouchableOpacityProps = BaseTouchableOpacityProps & {
  pressHapticPattern?: HapticPattern
  pressInHapticPattern?: HapticPattern
  pressOutHapticPattern?: HapticPattern
  longPressHapticPattern?: HapticPattern

  pressSound?: AudioSource
  pressInSound?: AudioSource
  pressOutSound?: AudioSource
  longPressSound?: AudioSource
}

export const TouchableOpacity = ({
  pressHapticPattern,
  pressInHapticPattern,
  pressOutHapticPattern,
  longPressHapticPattern,

  pressSound,
  pressInSound,
  pressOutSound,
  longPressSound,
  ...props
}: TouchableOpacityProps) => {
  const pressSFX = useAudioPlayer(pressSound);
  const pressInSFX = useAudioPlayer(pressInSound);
  const pressOutSFX = useAudioPlayer(pressOutSound);
  const longPressSFX = useAudioPlayer(longPressSound);

  const onPress = useCallback(
    (event: GestureResponderEvent) => handlePress({
      event,
      eventHandler: props.onPress, 
      pattern: pressHapticPattern,
      sound: pressSFX
    }), 
    [props.onPress, pressHapticPattern, pressSFX]
  );

  const onPressIn = useCallback(
    (event: GestureResponderEvent) => handlePress({
      event,
      eventHandler: props.onPressIn, 
      pattern: pressInHapticPattern,
      sound: pressInSFX
    }), 
    [props.onPressIn, pressInHapticPattern, pressInSFX]
  );

  const onPressOut = useCallback(
    (event: GestureResponderEvent) => handlePress({
      event,
      eventHandler: props.onPressOut, 
      pattern: pressOutHapticPattern,
      sound: pressOutSFX
    }), 
    [props.onPressOut, pressOutHapticPattern, pressOutSFX]
  );

  const onLongPress = useCallback(
    (event: GestureResponderEvent) => handlePress({
      event,
      eventHandler: props.onLongPress, 
      pattern: longPressHapticPattern,
      sound: longPressSFX
    }), 
    [props.onLongPress, longPressHapticPattern, longPressSFX]
  );

  return (
    <BaseTouchableOpacity
      {...props}
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onLongPress={onLongPress}
    />
  );
}
