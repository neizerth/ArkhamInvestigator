import {
	type SharedValue,
	useAnimatedStyle,
	withTiming,
} from "react-native-reanimated";

export const useOpacityAnimation = (opacity: SharedValue<number>) => {
	return useAnimatedStyle(() => {
		return {
			opacity: withTiming(opacity.value, {
				duration: 500,
			}),
		};
	});
};
