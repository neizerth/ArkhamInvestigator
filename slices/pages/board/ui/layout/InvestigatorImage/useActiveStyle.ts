import { selectCurrentBoard, useAppSelector } from "@shared/lib";
import { useEffect } from "react";
import { ViewStyle } from "react-native";
import { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated"

export const useActiveStyle = () => {
  const board = useAppSelector(selectCurrentBoard);
  const { actions } = board.value;

  useEffect(() => {
    grayscale.value = actions > 0 ? 0 : 1;
  }, [actions])

  const grayscale = useSharedValue(0);

  const style = useAnimatedStyle((): ViewStyle => {
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

  return style;
}