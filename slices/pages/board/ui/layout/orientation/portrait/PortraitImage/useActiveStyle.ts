import { selectCurrentBoard, useAppSelector } from "@shared/lib";
import { useEffect } from "react";
import type { ViewStyle } from "react-native";
import { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated"

export const useActiveStyle = () => {
  const board = useAppSelector(selectCurrentBoard);
 
  const actions = board?.value.actions || 0;
  const additionalAction = board?.value.additionalAction;

  useEffect(() => {
    grayscale.value = actions > 0 || additionalAction ? 0 : 1;
  }, [actions, additionalAction])

  const grayscale = useSharedValue(0);

  return useAnimatedStyle((): ViewStyle => {
    return {
      filter: [
        {
          grayscale: withTiming(grayscale.value, {
            duration: 500
          })
        }
      ]
    };
  });
}