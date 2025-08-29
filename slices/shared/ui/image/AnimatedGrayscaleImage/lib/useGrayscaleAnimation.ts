import type { ViewStyle } from "react-native";
import { useBooleanAnimation } from "../../../../lib";

export const useGrayscaleAnimation = (inactive: boolean) => {
	return useBooleanAnimation<ViewStyle>({
		enabled: inactive,
		styleResolver(grayscale) {
			"worklet";
			return {
				filter: [
					{
						grayscale,
					},
				],
			};
		},
	});
};
