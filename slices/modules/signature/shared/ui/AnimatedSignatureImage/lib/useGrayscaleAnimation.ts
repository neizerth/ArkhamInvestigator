import { useBooleanAnimation } from "@shared/lib";
import type { ViewStyle } from "react-native";

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
