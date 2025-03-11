import { selectShowDescription, useAppSelector } from "@shared/lib";
import { useEffect } from "react";
import { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

export const useOverlayStyle = () => {
  const showDescription = useAppSelector(selectShowDescription);
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = showDescription ? 1 : 0;
  }, [opacity, showDescription])

  const style = useAnimatedStyle(() => {
    return {
      opacity: withTiming(opacity.value, {
        duration: 500
      }),
      zIndex: showDescription ? 1 : -1
    };
  });

  return style;
}