import {
	selectShowDescription,
	useAppSelector,
	useBooleanAnimation,
} from "@shared/lib";
import { useMemo } from "react";
import { Dimensions } from "react-native";
import {
	PORTRAIT_DESCRIPTION_HEIGHT,
	descriptionSize,
} from "../../../../../../config";

const screen = Dimensions.get("screen");

export const useContainerAnimation = () => {
	const showDescription = useAppSelector(selectShowDescription);

	const maxValue = useMemo(() => {
		const height = screen.width / descriptionSize.ratio;
		return screen.height - height;
	}, []);

	const minValue = screen.height - PORTRAIT_DESCRIPTION_HEIGHT;

	return useBooleanAnimation({
		enabled: showDescription,
		duration: 100,
		minValue,
		maxValue,
		styleResolver(top) {
			"worklet";
			return {
				top,
			};
		},
	});
};
