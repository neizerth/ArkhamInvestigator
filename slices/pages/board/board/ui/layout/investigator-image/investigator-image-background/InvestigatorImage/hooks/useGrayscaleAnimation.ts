import {
	selectCurrentIsInactive,
	useAppSelector,
	useBooleanAnimation,
} from "@shared/lib";
import type { ViewStyle } from "react-native";

export const useGrayscaleAnimation = () => {
	const inactive = useAppSelector(selectCurrentIsInactive);

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
