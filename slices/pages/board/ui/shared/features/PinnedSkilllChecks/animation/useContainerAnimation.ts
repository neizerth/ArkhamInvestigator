import { useBooleanAnimation } from "@shared/lib";
import { useWindowDimensions } from "react-native";

export const useContainerAnimation = (enabled: boolean) => {
	const { width } = useWindowDimensions();

	return useBooleanAnimation({
		enabled,
		delayIn: 200,
		duration: 200,
		maxValue: 0,
		minValue: -width + 80,
		styleResolver(left) {
			"worklet";
			return {
				left,
			};
		},
	});
};
