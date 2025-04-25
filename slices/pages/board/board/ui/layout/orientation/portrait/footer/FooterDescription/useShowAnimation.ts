import {
	selectShowDescription,
	useAppSelector,
	useBooleanAnimation,
} from "@shared/lib";
import { useContext, useMemo } from "react";
import { useSharedValue } from "react-native-reanimated";
import {
	LayoutContext,
	PORTRAIT_DESCRIPTION_HEIGHT,
	descriptionSize,
} from "../../../../../../config";

export const useShowAnimation = () => {
	const top = useSharedValue(0);

	const showDescription = useAppSelector(selectShowDescription);

	const { view } = useContext(LayoutContext);
	const { width } = view;

	const maxValue = useMemo(() => {
		const height = width / descriptionSize.ratio;
		return PORTRAIT_DESCRIPTION_HEIGHT - height;
	}, [width]);

	return useBooleanAnimation({
		enabled: showDescription,
		duration: 100,
		maxValue,
		styleResolver(top) {
			"worklet";
			return {
				top,
			};
		},
	});
};
