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

type Options = {
	offsetTop?: number;
};

export const useContainerAnimation = ({ offsetTop = 0 }: Options) => {
	const showDescription = useAppSelector(selectShowDescription);

	const maxValue = useMemo(() => {
		const height = screen.width / descriptionSize.ratio;
		return screen.height - height - offsetTop;
	}, [offsetTop]);

	const minValue = screen.height - PORTRAIT_DESCRIPTION_HEIGHT - offsetTop;

	return useBooleanAnimation({
		enabled: showDescription,
		duration: 100,
		minValue,
		maxValue,
		styleResolver(top) {
			"worklet";
			// @ts-ignore: take animation value from object
			const { current } = top;
			const hide = Math.abs(current - minValue) < 5;

			return {
				top,
				zIndex: hide ? -1 : 5,
			};
		},
	});
};
