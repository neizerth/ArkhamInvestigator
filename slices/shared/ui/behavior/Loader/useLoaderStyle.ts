import { useAnimatedStyle, useSharedValue, withRepeat, withSpring } from "react-native-reanimated"

export const useLoaderStyle = (defaultSize: number) => {
  const size = useSharedValue(defaultSize);
  const toSize = defaultSize * 0.9;
  size.value = withRepeat(withSpring(toSize), -1);

  return useAnimatedStyle(() => ({
    width: size.value,
    height: size.value
  }))
}